package pl.polsl.acsupport.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.polsl.acsupport.entities.User;
import pl.polsl.acsupport.repositories.UserRepository;

import javax.persistence.EntityNotFoundException;

@Service
public class SecurityUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException{
        User user = userRepository.findUserByLogin(userName)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return new SecurityUserPrincipal(user);
    }
}
