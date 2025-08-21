package project.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.management.relation.Role;
import javax.persistence.*;
import java.util.*;

@Entity
@Getter
@Setter
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;


    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;

    @Temporal(TemporalType.DATE)
    private Date creationDate;


    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private Set<ClothesEntity> clothes=new HashSet<>();



    @OneToOne(mappedBy = "userEntity", cascade = CascadeType.ALL)
    private UserRole userRole;



    private String ImageName;


    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private Set<Events> events=new HashSet<>();




}
