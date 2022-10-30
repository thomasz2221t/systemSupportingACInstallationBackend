package pl.polsl.acsupport;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class AcSupportApplication {

    public static void main(String[] args) {
        SpringApplication.run(AcSupportApplication.class, args);
    }

}
