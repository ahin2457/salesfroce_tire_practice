public with sharing class tireProduct {
       
        @AuraEnabled
        public static List<Product2> getProduct(Integer limitSize, Integer offset){
            List<Product2> products = [SELECT Id, Name, Material__c, Desciption__c, Desciption2__c, Division__c, Car_Type__c,Brand__c, S_Width__c, Tire_Type__c, Type__c ,Net_Weight__c, Pattern__c, Sales_Pattern__c, Performance__c 
            FROM Product2 ORDER BY CreatedDate LIMIT :limitSize OFFSET :offset 
                                         ];     // limitSize : 한번에 가져올 데이터의 최대 수를 나타냄 
                                                //              즉,페이지당 표시할 항목 또는 한번에 검색할 데이터의 수를 제한함
                                                //              예를 들어 limitSize 가 40으로 설정되면 한 번에 40개의 데이터 항목을 가져올 것
                                                // offset : 현재 데이터 집합에서 어디에서부터 데이터를 가져와야 하는지 나타내는 정수값.
                                                //          예를 들어, 첫 번째 페이지의 경우 `offset` 은 0입니다.
                                                //                    두 번째 페이지에서 데이터를 가져오려면 offset을 limitSize의 배수로 증가시킵니다.
                                                //                    예를 들어,2 페이지에서 `limitSize`가 40이라면 `offset`은 80이 됩니다.
                                                //                              이것은 페이지 별로 데이터를 나누고 데이터베이스 쿼리에서 원하는 데이터의 범위를 설정하는데 사용됩니다.
                                                // 
            return products;
        }



        @AuraEnabled
        public static List<Product2> searchProduct(String searchString){
                        String searchKeyword = '%' + searchString + '%';
                        List<Product2> resultSearch = [SELECT Id, Name, Material__c, Desciption__c, Desciption2__c, Division__c, Car_Type__c,Brand__c, S_Width__c, Tire_Type__c, Type__c ,Net_Weight__c, Pattern__c, Sales_Pattern__c, Performance__c 
                                                        FROM Product2
                                                        WHERE Name LIKE :searchKeyword OR Material__c LIKE : searchKeyword OR Brand__c LIKE : searchKeyword OR Tire_Type__c LIKE :searchKeyword  LIMIT 100];
                        return  resultSearch;
        }
}