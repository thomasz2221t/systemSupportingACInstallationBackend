package pl.polsl.acsupport.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.acsupport.dtos.UserDto;
import pl.polsl.acsupport.entities.*;
import pl.polsl.acsupport.enums.RoleName;
import pl.polsl.acsupport.repositories.RoleRepository;
import pl.polsl.acsupport.repositories.UserRepository;

import javax.persistence.EntityNotFoundException;
import java.util.Set;


@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)

public class UserService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

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
    public User create(UserDto userDto, RoleName userRole){
        final User user = new User();
        user.setLogin(userDto.getLogin());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setTelephone(userDto.getTelephone());
        user.setEnabled(true);
        Role role = roleRepository.findByName(userRole).orElseThrow(EntityNotFoundException::new);
        Set<Role> roles = user.getRoles();
        roles.add(role);
        user.setRoles(roles);
        return userRepository.save(user);
    }

    @Transactional
    public User update(Long id, UserDto userDto){
        final User user = findById(id);
        user.setLogin(userDto.getLogin());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setTelephone(userDto.getTelephone());
        return userRepository.save(user);
    }

    @Transactional
    public void delete(Long id){
        User user = findById(id);
        Set<Offer> offers = user.getOffers();
        offers.forEach(offer -> offer.setUser(null));
        Set<Message> messages = user.getMessage();
        messages.forEach(message -> message.setUser(null));
        Set<Role> roles = user.getRoles();
        roles.remove(user);
        Set<Building> buildings = user.getBuildings();
        buildings.forEach(building -> building.setUser(null));
        userRepository.delete(findById(id));
    }

    public Page<UserDto> findAllOperators(Pageable pageable){
        final Page<User> users = userRepository.findAllByRoles(RoleName.OPERATOR, pageable);
        return users.map(UserDto::new);
    }

}
