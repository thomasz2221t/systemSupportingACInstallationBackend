package pl.polsl.acsupport.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.acsupport.dtos.UserDto;
import pl.polsl.acsupport.entities.User;
import pl.polsl.acsupport.enums.RoleName;
import pl.polsl.acsupport.repositories.RoleRepository;
import pl.polsl.acsupport.repositories.UserRepository;

import javax.persistence.EntityNotFoundException;


@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)

public class UserService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    public Page<UserDto> findAll(Pageable pageable){
        final Page<User> users = userRepository.findAll(pageable);
        return users.map(UserDto::new);
    }

    public User findById(Long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with given id not found"));
    }

    public UserDto get(Long id){
        final User user = findById(id);
        return new UserDto(user);
    }

    @Transactional
    public User create(UserDto userDto){
        final User user = new User();
        user.setLogin(userDto.getLogin());
        user.setPassword(userDto.getPassword());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setTelephone(userDto.getTelephone());
        return userRepository.save(user);
    }

    @Transactional
    public User update(Long id, UserDto userDto){
        final User user = findById(id);
        user.setLogin(userDto.getLogin());
        user.setPassword(userDto.getPassword());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setTelephone(userDto.getTelephone());
        return userRepository.save(user);
    }

    @Transactional
    public void delete(Long id){
        userRepository.delete(findById(id));
    }

    public Page<UserDto> findAllOperators(Pageable pageable){
        final Page<User> users = userRepository.findAllByRoles(RoleName.OPERATOR, pageable);
        return users.map(UserDto::new);
    }

}
