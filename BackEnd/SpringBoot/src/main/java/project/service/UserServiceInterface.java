package project.service;

import project.dto.UserDtoUpdate;
import project.models.UserEntity;

import java.util.List;

public interface UserServiceInterface {
    UserEntity updateUserPut(int id , UserDtoUpdate user) ;
    void deleteUser(int id);
    List<UserEntity> getListUsers() ;
    UserEntity getById(int id);
    UserEntity getUserByUsername(String un);
    String addUserWTUN(UserEntity user);



}
