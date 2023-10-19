public with sharing class tireProduct {
  
    @AuraEnabled
    public static Product2 getProductInfo(String productId){
       Product2 getInfo;
        
        getInfo =[SELECT Id, ProductCode,Name, Material__c, Desciption__c, Desciption2__c, Division__c, Car_Type__c,Brand__c, S_Width__c, Tire_Type__c, Type__c ,Net_Weight__c, Pattern__c, Sales_Pattern__c, Performance__c 
        FROM Product2 WHERE Id=:productId];
        System.debug('getInfo'+ getInfo);
        return getInfo;
    }

    //select
    @AuraEnabled
    public static List<Product2> getProducts(){
      
      return [SELECT Id, ProductCode,Name, Material__c, Desciption__c, Desciption2__c, Division__c, Car_Type__c,Brand__c, S_Width__c, Tire_Type__c, Type__c ,Net_Weight__c, Pattern__c, Sales_Pattern__c, Performance__c 
              FROM Product2 ORDER BY Name ASC LIMIT 1000];
      }


        @AuraEnabled
        public static List<Product2> recentlyViewProduct(){
          List<Product2> recentProduct = [SELECT Id, ProductCode,Name, Material__c, Desciption__c, Desciption2__c, Division__c, Car_Type__c,Brand__c, S_Width__c, Tire_Type__c, Type__c ,Net_Weight__c, Pattern__c, Sales_Pattern__c, Performance__c 
          FROM Product2 ORDER BY LastViewedDate ASC LIMIT 300];
          // LastViewedDate
          return recentProduct;
        }

        // 검색
        @AuraEnabled
        public static List<Product2> searchProduct(String searchString){
            String searchKeyword = '%' + searchString + '%';
            List<Product2> resultSearch =[SELECT Id, ProductCode,Name, Material__c, Desciption__c, Desciption2__c, Division__c, Car_Type__c,Brand__c, S_Width__c, Tire_Type__c, Type__c ,Net_Weight__c, Pattern__c, Sales_Pattern__c, Performance__c 
                                      FROM Product2 
                                      WHERE Name LIKE :searchKeyword OR Material__c LIKE : searchKeyword OR Brand__c LIKE : searchKeyword OR Tire_Type__C LIKE :searchKeyword OR Car_Type__c LIKE :searchKeyword LIMIT 100];
                return resultSearch;
        }

        @AuraEnabled
        public static void updateProduct(Id productId, String description, String descriptionDetail){
          system.debug('START UPDATE Opps, Ids ::'+ productId );
          Product2 updateRecordPro = [SELECT Id, ProductCode,Name, Material__c, Desciption__c, Desciption2__c, Division__c, Car_Type__c,Brand__c, S_Width__c, Tire_Type__c, Type__c ,Net_Weight__c, Pattern__c, Sales_Pattern__c, Performance__c 
          FROM Product2
           WHERE Id =:productId];
        
          // try{
          //   system.debug('before RecordOpp check :: ' + updateRecordPro);
          //   updateRecordPro.Description = description;
          //   updateRecordPro.Description__c = descriptionDetail;
           
          //   if(updateRecordPro.CreatedById == updateRecordPro.LastModifiedById){
          //   upsert updateRecordPro;
          //   system.debug('After RecordOpp check :: ' + updateRecordPro);
            
          // }}
          // catch(Exception e){
          //   system.debug(e.getMessage());
          // }
        }
}