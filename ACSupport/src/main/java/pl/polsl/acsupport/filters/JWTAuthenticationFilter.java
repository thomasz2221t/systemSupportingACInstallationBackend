package pl.polsl.acsupport.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pl.polsl.acsupport.config.SecurityUserPrincipal;
import pl.polsl.acsupport.entities.Role;
import pl.polsl.acsupport.payload.AuthenticationResponse;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

import static pl.polsl.acsupport.config.SecurityConstants.EXPIRATION_TIME;
import static pl.polsl.acsupport.config.SecurityConstants.SECRET;

@Slf4j
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager){
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res) throws AuthenticationException {
        String login = req.getParameter("login");
        String password = req.getParameter("password");

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(login,password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain, Authentication auth) throws IOException {

        SecurityUserPrincipal user = (SecurityUserPrincipal) auth.getPrincipal();
        Set<Role> rolesSet = user.getUser().getRoles();

        String roles = String.valueOf(user.getAuthorities()
                .stream().map(GrantedAuthority::getAuthority).collect(Collectors.toSet()));
        roles = roles.replaceAll("\\s+","");

        Algorithm algorithm = Algorithm.HMAC256(SECRET.getBytes());
        String token = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .withIssuer(req.getRequestURL().toString())
                .withClaim("roles", roles)
                .sign(algorithm);

       AuthenticationResponse authenticationResponse = new AuthenticationResponse();
       authenticationResponse.setId(user.getUser().getId());
       authenticationResponse.setRoles(rolesSet.stream().map(role->role.getName().name()).collect(Collectors.toSet()));
        authenticationResponse.setToken(token);

        String jsonString = new Gson().toJson(authenticationResponse);
        res.getWriter().write(jsonString);
        res.getWriter().flush();
    }
}
