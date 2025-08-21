package project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project.dto.UserDtoUpdate;
import project.models.UserEntity;
import project.service.UserServiceImplementation;
import project.service.UserServiceInterface;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserServiceInterface userServiceInterface;
    @Autowired
    UserServiceImplementation userServiceImplementation;

    @PutMapping(value = "/updateUserP/{id}")
    public UserEntity updateUserPut (@PathVariable int id , @RequestBody UserDtoUpdate user)
    {
        return userServiceInterface.updateUserPut(id,user) ;

    }
    @PutMapping(value = "/updateUserImage/{id}")
    public UserEntity updateUserImage (@PathVariable int id ,  @RequestParam("imagefile") MultipartFile imagefile) throws IOException {
        System.out.println("hoho");
        String path="C:\\Users\\MSI\\Desktop\\chick_choice1-main\\src\\assets\\images";
        Files.copy(imagefile.getInputStream(), Paths.get(path+ File.separator+imagefile.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);

        return userServiceImplementation.updateUserImage(id,imagefile.getOriginalFilename()) ;

    }
    @DeleteMapping(value ="/delete/{Id}" )
    public void deleteUser(@PathVariable int Id) {
        userServiceInterface.deleteUser(Id) ;
    }

    @GetMapping(value = "/getAllUsers")
    public List<UserEntity> getAllUsers()
    {
        return userServiceInterface.getListUsers();

    }

    @GetMapping(value = "getUserById/{id}")
    public UserEntity getUserById(@PathVariable int id)
    {
        return userServiceInterface.getById(id);

    }


    @GetMapping(value = "/getUseerByUN/{un}")
    public UserEntity getUserByUN(@PathVariable String un)
    {
        return userServiceInterface.getUserByUsername(un);

    }

    @PostMapping(value = "/addWTUN")
    public String addUserWTUN(@RequestBody UserEntity user)
    {
        return userServiceInterface.addUserWTUN(user);
    }





}
