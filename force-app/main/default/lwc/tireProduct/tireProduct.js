import { LightningElement, wire, api, track } from 'lwc';
 
import getProductList from '@salesforce/apex/tireProduct.getProductList';
 
export default class tireProduct extends LightningElement {
 
    // @track recordEnd = 0;
    // @track recordStart = 0;
    // @track pageNumber = 1;
    // @track totalRecords = 0;
    // @track totalPages = 0;
    // @track loaderSpinner = false;
    // @track error = null;
    // @track pageSize = 10;    
    // @track isPrev = true;
    // @track isNext = true;
    // @track products = [];



    connectedCallback() {
        this.loadMoreData();
    }

 
    connectedCallback() {
        this.getProducts();
    }
 
 
    handlePageNextAction(){
        this.pageNumber = this.pageNumber+1;
        this.getProducts();
    }
 
 
    handlePagePrevAction(){
        this.pageNumber = this.pageNumber-1;
        this.getProducts();
    }
 
 
    getProducts(){
        this.loaderSpinner = true;
        getProductList({pageSize: this.pageSize, pageNumber : this.pageNumber})
        .then(result => {
            this.loaderSpinner = false;
            if(result){
                var resultData = JSON.parse(result);
                this.recordEnd = resultData.recordEnd;
                this.totalRecords = resultData.totalRecords;
                this.recordStart = resultData.recordStart;
                this.products = resultData.products;
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
        if(this.products){
            if(this.products.length == 0){
                isDisplay = true;
            }else{
                isDisplay = false;
            }
        }
        return isDisplay;
    }
 
     
    
}