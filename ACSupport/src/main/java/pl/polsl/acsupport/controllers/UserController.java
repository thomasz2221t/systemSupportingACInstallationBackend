package pl.polsl.acsupport.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.polsl.acsupport.dtos.UserDto;
import pl.polsl.acsupport.enums.RoleName;
import pl.polsl.acsupport.services.UserService;

@RequiredArgsConstructor
@RequestMapping("/user")
@RestController
@Validated
public class UserController {

    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    @PreAuthorize("hasAuthority('FIND_USER')")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<UserDto> findAllUsers(@PageableDefault Pageable pageable){
        return userService.findAll(pageable);
    }

    @PreAuthorize("hasAuthority('FIND_USER')")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserDto findUser(@PathVariable Long id){
        return userService.get(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long create(@RequestBody UserDto userDto, @RequestParam RoleName userRole){
        return userService.create(userDto, userRole).getId();
    }

    @PreAuthorize("hasAuthority('UPDATE_USER')")
    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable Long id, @RequestBody UserDto userDto){
        userService.update(id, userDto);
    }

    @PreAuthorize("hasAuthority('DELETE_USER')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id){
        userService.delete(id);
    }

    @PreAuthorize("hasAuthority('FIND_USER')")
    @GetMapping("/operators")
    @ResponseStatus(HttpStatus.OK)
    public Page<UserDto> findAllOperators(@PageableDefault Pageable pageable){
        return userService.findAllOperators(pageable);
    }
}
