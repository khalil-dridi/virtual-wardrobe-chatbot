package project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class usermanagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(usermanagementApplication.class, args);
	}

}
