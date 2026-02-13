package com.clothstore.clothingbackend.request;

import lombok.Data;

@Data
public class OrderRequest {

    private Long userId;
    private Address address;

    @Data
    public static class Address {
        private String fullName;
        private String phone;
        private String city;
        private String state;
        private String pincode;
        private String fullAddress;
    }
}
