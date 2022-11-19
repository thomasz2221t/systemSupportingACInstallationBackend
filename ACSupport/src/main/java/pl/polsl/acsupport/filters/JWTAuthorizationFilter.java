package pl.polsl.acsupport.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;
import static pl.polsl.acsupport.config.SecurityConstants.SECRET;
import static pl.polsl.acsupport.config.SecurityConstants.TOKEN_PREFIX;

@Slf4j
public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager){
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
        if(req.getServletPath().equals("/login")){
            chain.doFilter(req,res);
        }
        else{
            String authorizationHeader = req.getHeader(AUTHORIZATION);
            if(authorizationHeader != null && authorizationHeader.startsWith(TOKEN_PREFIX)){
                try{
                    String token = authorizationHeader.substring(TOKEN_PREFIX.length());

                    Algorithm algorithm = Algorithm.HMAC256(SECRET.getBytes());

                    JWTVerifier verifier = JWT.require(algorithm).build();

                    DecodedJWT decodedJWT = verifier.verify(token);

                    String login = decodedJWT.getSubject();
                    String claim = decodedJWT.getClaim("roles").asString();
                    claim = claim.replace("[","").replace("]","");
                    String[] roleNames = claim.split(",");

                    List<SimpleGrantedAuthority> authorities = new ArrayList<>();

                    for(String role: roleNames){
                        authorities.add(new SimpleGrantedAuthority(role));
                    }

                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            login, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    chain.doFilter(req,res);
                }catch(Exception e){
                    res.setStatus(FORBIDDEN.value());
                    Map<String,String> error = new HashMap<>();
                    error.put("error_message", e.getMessage());
                    res.setContentType(APPLICATION_JSON_VALUE);
                    new ObjectMapper().writeValue(res.getOutputStream(),error);

                }
            }else{
                chain.doFilter(req,res);
            }
        }
    }


}
