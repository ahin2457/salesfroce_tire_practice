import { LightningElement, wire, api, track } from 'lwc';
 
import getProduct from '@salesforce/apex/tireProduct.getProduct';
import searchProduct from '@salesforce/apex/tireProduct.searchProduct';
 
export default class tireProduct extends LightningElement {
 
    @track products = [];
    @track limitSize = 30;
    @track offset = 0;
    @track isFetchingData = false;
 
    async viewAll(){
        const result = await getProduct();
        this.products = result.map((row)=>{
            return this.maproducts(row);
        });
    }

    async handleSearch(event){
        if(!event.target.value){
            await this.viewAll();
        }   else{
            await this.searchView();
        }
    }
   
    async searchView(){
        const searchProduts = await searchProduct({searchString: event.target.value});
            this.products = searchProduts.map(row =>{
                return this.maproducts(row);
            })
    
    }
    
    maproducts(row){
        return {...row,
            NameUrl: row.ProductCode,
            ProductNameL: row.Name,
            ProductCode: `/${row.Id}`,
            productLink: `/${row.Id}`
        };
    }


    // 컴포넌트가 생성될 떄 호출되는 연결 콜백
    connectedCallback() {
        this.loadData();
    }
    
    // 데이터를 가져와서 products 배열에 추가하는 메서드
    loadData() {
        if (!this.isFetchingData) { // 데이터 로딩 중인지 확인
            this.isFetchingData = true; // 로딩 중임을 표시
            
            // APEX 메서드를 호출하려 데이터 가져오기
            getProduct({ limitSize: this.limitSize, offset: this.offset })
                .then(result => {
                    
                    // 결과를 products 배열에 추가 
                    this.products = this.products.concat(result);
                    // 로딩이 완료되었음을 표시 
                    this.isFetchingData = false;
                })
                .catch(error => {
                    // 에러 로깅
                    console.error('Error fetching data: ' + JSON.stringify(error));
                    
                    // 로딩이 완료되었음을 표시 
                    this.isFetchingData = false; 
                });
        }
    }
    // loadMoreData() 사용자가 페이지의 하단으로 스크롤할 때 더 많은 데이터를 로드함.
    //                사용자가 스크롤을 다음 페이지에 도달하면 offset을 업데이트 하고 loadData()를 호출하여 추가 데이터를 가져옴.
    // 더 많은 데이터를 가져오는 메서드 (무한 스크롤을 위한 이벤트 핸들러)
    loadMoreData(event) {
        const container = this.template.querySelector('div');

        // 스크롤이 페이지 하단에 도달하면 다음 페이지의 데이터를 가져오기 
        if (container.scrollHeight - container.scrollTop <= container.clientHeight) {
            this.offset += this.limitSize;  // offset을 업데이트하여 다음 페이지의 데이터를 가져오기
            this.loadData();    // 데이터 가져오는 메서드 호출
        }
    }
     
    
}