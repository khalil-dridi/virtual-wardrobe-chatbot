package project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import project.dto.UserDtoUpdate;
import project.models.UserEntity;
import project.models.UserRole;
import project.repository.RoleRepository;
import project.repository.UserRepository;

import javax.management.relation.Role;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserServiceInterface{
    @Autowired
    UserRepository userRepository ;
    @Autowired
    RoleRepository roleRepository ;
    @Override
    public UserEntity updateUserPut(int id , UserDtoUpdate user) {
        UserEntity usr= userRepository.findById(id).get() ;
        usr.setFirstName(user.getFirstName());
        usr.setLastName(user.getLastName());
        usr.setUsername(user.getUsername());
        usr.setEmail(user.getEmail()) ;
        if(!user.getPassword().equals(""))
        usr.setPassword(user.getPassword());
        return userRepository.save(usr);
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<UserEntity> getListUsers()
    {
        return userRepository.findAll();
    }

    @Override
    public  UserEntity getById(int id)
    {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public UserEntity getUserByUsername(String username)
    {
        return userRepository.findByUsername(username).orElse(null);
    }



    @Override
    public String addUserWTUN(UserEntity user){
        String ch="";
        if( userRepository.existsByUsername(user.getUsername()) )
        {
            ch="username already exists";
        }else{
            userRepository.save(user)  ;
            ch="user added successfully ! ! !";
        }

        return ch;
    }


    public UserEntity updateUserImage(int id, String imageName) {
        UserEntity myUser= getById(id);
        myUser.setImageName(imageName);
        userRepository.save(myUser);
        return  myUser;
    }
}
