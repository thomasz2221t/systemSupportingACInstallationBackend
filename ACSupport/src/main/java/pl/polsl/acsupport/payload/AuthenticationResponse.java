package pl.polsl.acsupport.payload;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@RequiredArgsConstructor
public class AuthenticationResponse {
    private String token;
    private Long id;
    private Set<String> roles;
}
