package project.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter

public class Events {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id ;
   private int date;
   private String title;
   private String color;
   private int month;
   private int year;
 @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

}
