import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { BaseComponent, checkPrivileges, isSet, moduleId } from 'src/app/core/base/base.component';
import { CoreService } from 'src/app/core/core.service';
import { CommitteesService } from '../committees.service';

@Component({
  selector: 'app-committee-board-documents',
  templateUrl: './committee-board-documents.component.html',
  styleUrls: ['./committee-board-documents.component.scss']
})
export class CommitteeBoardDocumentsComponent extends BaseComponent implements OnInit {

  constructor(private committeesService: CommitteesService,
    private confirmationService: ConfirmationService, private coreService: CoreService,
    public messageService: MessageService, public translates: TranslateService) {
    super(messageService, translates)

  }
  @Input() boardDocuments: any
  @Input() committeeID: any
  @Input() privileges: any

  columns = [
    { header: 'Name', field: 'name', width: '30%' },
    { header: 'Created By', field: 'createdBy', type: 'user' },
    { header: 'Modified', field: 'createdAt', type: 'date' },
  ]
  caption = { title: '', title2: 'files' }
  actionsColumns = [{ header: 'Actions', key: 'action' }]

  treeDocuments: any[] = []
  selectedFolder: any
  expandedIcon = "pi pi-folder-open text-xl"
  collapsedIcon = "pi pi-folder text-xl"
  documents = []
  editnewFolderModal = false
  attahmentsFolderModal = false
  newAttachments = []
  newFolder: any
  contextMenu = []
  header = 'New Folder'
  mode = 'ADD'
  attachmentsAction = []
  selectedFile: any
  addPath = 'Main'
  loadingTable = false
  ngOnInit(): void {
    if (this.boardDocuments.length) {
      this.buildTree()
    }
    this.initContextMenu()
    this.getAttachmentsAction()

  }
  getAttachmentsAction() {

    this.attachmentsAction.push({
      label: this.trans('Download') + '\n' + this.trans('File'),
      icon: 'pi pi-cloud-download text-lg',
      command: () => {
        this.downloadFile()
      }

    })

    if (this.checkPrivileges('DeleteDocumentCommand')) {
      this.attachmentsAction.push({
        label: this.trans('Delete') + '\n' + this.trans('File'),
        icon: 'pi pi-trash text-lg',
        command: () => {
          this.deleteFile()

        }

      })
    }
  }
  checkPrivileges(action) {
    return checkPrivileges(this.privileges, action)
  }
  initContextMenu() {
    if (this.checkPrivileges('CreateFolderCommand')) this.contextMenu.push({ label: this.trans('New'), icon: 'pi pi-plus', command: (event) => this.showNewFolder() })

    if (this.checkPrivileges('RenameFolderCommand')) this.contextMenu.push({ label: this.trans('Edit'), icon: 'pi pi-pencil', command: (event) => this.showEditFolder() })

    if (this.checkPrivileges('DeleteFolderCommand')) this.contextMenu.push({ label: this.trans('Delete'), icon: 'pi pi-trash', command: (event) => this.deleteFolder() })

  }
  buildTree() {
    this.boardDocuments.map(folder => {
      this.treeDocuments.push({ key: folder?.id, label: folder?.title, icon: "pi pi-folder text-xl", type: 'folder', children: [] })

    })

    this.selectedFolder = this.treeDocuments[0]
    this.caption.title = this.selectedFolder?.label

    this.committeesService.showDocuments(this.selectedFolder?.key).subscribe(folders => {
      this.documents = []
      folders.data?.map(doc => {
        if (doc?.isFolder != true) {
          this.documents.push(doc)

        }


      })

    })

  }
  showDocsSelect(folder: any) {
    this.caption.title = this.selectedFolder?.label
    if (folder?.node?.icon == this.collapsedIcon) {
      folder.node.icon = this.expandedIcon

      this.committeesService.showDocuments(folder?.node?.key).subscribe(folders => {
        folder.node.children = []
        this.documents = []

        folders.data?.map(doc => {
          if (doc?.isFolder == true) {

            folder.node.children.push({ key: doc?.id, label: doc?.label, icon: "pi pi-folder text-xl", type: 'folder', children: [] })
            folder.node.expanded = true

          } else {
            this.documents.push(doc)
          }
        })

      })
    } else {
      folder.node.icon = this.collapsedIcon
      folder.node.children = []
    }


  }

  deleteFolder() {
    this.confirmationService.confirm({
      message: this.trans('Do you want to delete') + '\n' + this.trans('Folder'),
      header: this.trans('Delete Confirmation'),
      rejectLabel: this.trans('Cancel'),
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
      acceptLabel: this.trans('Confirm'),
      acceptButtonStyleClass: ' text-btn',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading = true

        this.committeesService.deleteFolder(this.selectedFolder?.key,this.committeeID).subscribe(() => {
          if (!isSet(this.selectedFolder?.parent)) {
            this.treeDocuments.map((item, index) => {
              if (item.key == this.selectedFolder.key) {
                this.treeDocuments.splice(index, 1);
                setTimeout(() => {
                  this.selectedFolder = this.treeDocuments[0]
                  this.showDocsSelect(this.selectedFolder)
                }, 100);

              }
            })
            this.selectedFolder = null
          } else {
            const selectdKey = this.selectedFolder?.key
            const parent = this.selectedFolder?.parent
            this.selectedFolder = null

            this.selectedFolder = parent

            this.selectedFolder?.children.map((item, index) => {

              if (item.key == selectdKey) {
                this.selectedFolder.children.splice(index, 1);
              }
            })

            setTimeout(() => {
              this.showDocsSelect(this.selectedFolder)

            }, 100);
          }

          this.loading = false
          this.successMessage(this.trans('Folder Deleted Successfully'))



        }, error => {
          this.loading = false

        })
      }

    });
  }
  showNewFolder(path?) {
    this.editnewFolderModal = true
    this.newFolder = null
    this.header = 'New Folder'
    this.mode = 'ADD'
    this.addPath = path
  }
  showEditFolder() {
    this.editnewFolderModal = true
    this.newFolder = this.selectedFolder?.label
    this.header = 'Edit Folder'
    this.mode = 'EDIT'
  }
  addNewFolder() {
    const body = {
      folderName: this.newFolder,
      parentId: this.addPath == 'main' ? null : this.selectedFolder?.key,
      id: this.committeeID,
      moduleId: moduleId('Committee'),


    }
    this.committeesService.newFolder(body).subscribe(folder => {


      if (this.addPath == 'main') {
        this.treeDocuments.push({ key: folder?.data?.id, label: folder?.data?.name, icon: "pi pi-folder text-xl", type: 'folder', children: [] })
        this.selectedFolder = this.treeDocuments[0]
      } else {
        if (this.treeDocuments.length) {
          this.selectedFolder?.children.push({ key: folder?.data?.id, label: folder?.data?.name, icon: "pi pi-folder text-xl", type: 'folder', children: [] })
        }
      }
      this.editnewFolderModal = false
    })
  }
  editFolder() {
    this.loading = true
    const body = {
      folderName: this.newFolder,
      folderId: this.selectedFolder.key,
      id: this.committeeID,
      moduleId: moduleId('Committee'),

    }

    this.committeesService.editfolder(body).subscribe(folder => {
      this.selectedFolder.label = this.newFolder
      this.editnewFolderModal = false
      this.loading = false

    }, error => {
      this.loading = false

    })
  }


  //

  deleteFile() {
    const attachments = this.documents?.findIndex(item => item?.fileName == this.selectedFile?.fileName)
    this.documents.splice(attachments, 1);
    this.loadingTable = true

    this.committeesService.deleteFile(this.selectedFile?.fileName,this.committeeID).subscribe(() => {
      this.loadingTable = false
      this.successMessage(this.trans('File Deleted Successfully'))

    }, error => {
      this.loadingTable = false

    })
  }
  showAddFile() {
    this.attahmentsFolderModal = true
    this.newAttachments = []
  }
  addFile() {
    this.newAttachments.map(item => {
      const body = {
        folderId: this.selectedFolder?.key,
        guid: item?.fileName,
        id: this.committeeID,
      moduleId: moduleId('Committee'),
      }
      this.committeesService.newFile(body).subscribe(file => {
        this.attahmentsFolderModal = false
        this.documents.push(file.data)
      })
    })

  }

  downloadFile() {
    this.loadingTable = true
    this.coreService.downloadAttachment(this.selectedFile?.fileName).subscribe(res => {

      var blob = new Blob([res], { type: this.selectedFile?.body?.ContentType });
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;

      link.download = this.selectedFile?.name?.split('?')[0];
      this.loadingTable = false

      link.click();
    }, error => {
      this.loadingTable = false

    })

  }

  setSelectedFile(file) {
    this.selectedFile = file

  }
}
