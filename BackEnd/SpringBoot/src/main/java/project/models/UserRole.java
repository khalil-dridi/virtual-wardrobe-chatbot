package project.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@Table(name = "roles")
public class UserRole {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int idRole;

    @Enumerated(EnumType.STRING)
    private UserRoleName userRoleName;

    //access

    private Boolean userManagement;
    private Boolean eventManagement;


    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

}
