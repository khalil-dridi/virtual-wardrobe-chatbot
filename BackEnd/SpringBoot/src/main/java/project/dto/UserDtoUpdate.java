package project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDtoUpdate {
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private String username;
}
