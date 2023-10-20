import { LightningElement, wire, api, track } from 'lwc';
 
import getContactList from '@salesforce/apex/contactPaginationLwcCtrl.getContactList';
 
export default class ContactPaginationLwc extends LightningElement {
 
    @track recordEnd = 0;
    @track recordStart = 0;
    @track pageNumber = 1;
    @track totalRecords = 0;
    @track totalPages = 0;
    @track loaderSpinner = false;
    @track error = null;
    @track pageSize = 10;    
    @track isPrev = true;
    @track isNext = true;
    @track contacts = [];
 
    connectedCallback() {
        this.getContacts();
    }
 
 
    handlePageNextAction(){
        this.pageNumber = this.pageNumber+1;
        this.getContacts();
    }
 
 
    handlePagePrevAction(){
        this.pageNumber = this.pageNumber-1;
        this.getContacts();
    }
 
 
    getContacts(){
        this.loaderSpinner = true;
        getContactList({pageSize: this.pageSize, pageNumber : this.pageNumber})
        .then(result => {
            this.loaderSpinner = false;
            if(result){
                var resultData = JSON.parse(result);
                this.recordEnd = resultData.recordEnd;
                this.totalRecords = resultData.totalRecords;
                this.recordStart = resultData.recordStart;
                this.contacts = resultData.contacts;
                this.pageNumber = resultData.pageNumber;                
                this.totalPages = Math.ceil(resultData.totalRecords / this.pageSize);
                this.isNext = (this.pageNumber == this.totalPages || this.totalPages == 0);
                this.isPrev = (this.pageNumber == 1 || this.totalRecords < this.pageSize);
            }
        })
        .catch(error => {
            this.loaderSpinner = false;
            this.error = error;
        });
    }
 
 
    get isDisplayNoRecords() {
        var isDisplay = true;
        if(this.contacts){
            if(this.contacts.length == 0){
                isDisplay = true;
            }else{
                isDisplay = false;
            }
        }
        return isDisplay;
    }
 
}