public with sharing class CustomProduct {
    
        @AuraEnabled
        public static List<Product2> getProducts(){
               return [SELECT Id, Name, Material__c, Desciption__c, Desciption2__c, Division__c, Car_Type__c,Brand__c, S_Width__c, Tire_Type__c, Type__c ,Net_Weight__c, Pattern__c, Sales_Pattern__c, Performance__c 
               FROM Product2 ORDER BY Name ASC LIMIT 1000];

        }

        // search
        @AuraEnabled
        public static List<Product2> searchProduct(String searchString){
            String searchKeyword = '%' + searchString + '%';
            List<Product2> resultSearch =[SELECT Id, Name, Material__c, Desciption__c, Desciption2__c, Division__c, Car_Type__c,Brand__c, S_Width__c, Tire_Type__c, Type__c ,Net_Weight__c, Pattern__c, Sales_Pattern__c, Performance__c 
                                      FROM Product2 
                                      WHERE Name LIKE :searchKeyword OR Material__c LIKE : searchKeyword OR Brand__c LIKE : searchKeyword OR Tire_Type__C LIKE :searchKeyword OR Car_Type__c LIKE :searchKeyword LIMIT 100];
                return resultSearch;
        }

        @AuraEnabled
        public static Boolean updateRecordData(Id recordId, String desciption , String desciption2){
                Product2 recordToUpdate = [SELECT Id, Desciption__c, Desciption2__c , CreatedById  FROM Product2  
                                     WHERE Id = :recordId ];
                // 현재 login되어있는 id
                Id userId = UserInfo.getUserId();
                // 데이터(record)를 만든 id = 제품담당자로 사용할것이다
                Id ownerId = recordToUpdate.CreatedById;
                
                Boolean result;
                try {
                        if(userId == ownerId ) {
                                
                                recordToUpdate.Desciption__c = desciption;
                                recordToUpdate.Desciption2__c = desciption2;

                                update recordToUpdate;

                               result = true;
                        }else {
                                result = false;
                        }
                }catch (Exception e) {
                        System.debug('레코드 업데이트 중 오류 발생: ' + e.getMessage());
                }
                        return result;
        }

        @AuraEnabled
        public static Product2 getProductsInfo(Id recordId){
                Product2 productInfo = [SELECT Id, Name, Material__c, Desciption__c, Desciption2__c, Division__c, Car_Type__c,Brand__c, S_Width__c, Tire_Type__c, Type__c ,Net_Weight__c, Pattern__c, Sales_Pattern__c, Performance__c 
                                        FROM Product2 
                                        WHERE Id = :recordId ];

                return productInfo;
          }


   
}