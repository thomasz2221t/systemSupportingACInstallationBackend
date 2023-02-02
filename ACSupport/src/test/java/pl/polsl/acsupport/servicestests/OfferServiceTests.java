package pl.polsl.acsupport.servicestests;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.domain.Page;
import pl.polsl.acsupport.dtos.InstallerEquipmentDto;
import pl.polsl.acsupport.dtos.OfferDto;
import pl.polsl.acsupport.dtos.UserDto;
import pl.polsl.acsupport.entities.InstallerEquipment;
import pl.polsl.acsupport.entities.Offer;
import pl.polsl.acsupport.entities.Service;
import pl.polsl.acsupport.entities.User;
import pl.polsl.acsupport.repositories.InstallerEquipmentRepository;
import pl.polsl.acsupport.repositories.OfferRepository;
import pl.polsl.acsupport.repositories.ServiceRepository;
import pl.polsl.acsupport.repositories.UserRepository;
import pl.polsl.acsupport.services.InstallerEquipmentService;
import pl.polsl.acsupport.services.OfferService;
import pl.polsl.acsupport.services.ServiceService;
import pl.polsl.acsupport.services.UserService;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class OfferServiceTests {

    @InjectMocks
    private OfferService offerService;

    @Mock
    private OfferRepository offerRepository;

    @Mock
    private InstallerEquipmentService installerEquipmentService;

    @Mock
    private InstallerEquipmentRepository installerEquipmentRepository;

    @Mock
    private ServiceService serviceService;

    @Mock
    private ServiceRepository serviceRepository;

    @Mock
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    private Offer offer1 = new Offer();

    private Service service1 = new Service();

    private InstallerEquipment installerEquipment1 = new InstallerEquipment();

    private Set<InstallerEquipment> offerInstallerEquipments = new LinkedHashSet<>();

    private User client1 = new User();

    @Before
    public void setUp(){
        client1.setLogin("client1");
        client1.setPassword("123");
        client1.setFirstName("Mariusz");
        client1.setLastName("Brzęczyszczykiewicz");
        client1.setEmail("mariusz_brzeczyszczykiewicz@gmail.com");
        client1.setTelephone("333444555");
        client1.setEnabled(true);

        service1.setDate(LocalDateTime.of(2023,03,10,17,20));
        service1.setDescription("Miejsce przygotowane pod montaż");
        service1.setRoom(null);
        service1.setType(null);

        offer1.setUser(client1);
        offer1.setService(service1);
        offer1.setDatesBegining(LocalDateTime.now());
        offer1.setDatesEnd(LocalDateTime.now());
        service1.setOffer(offer1);

        installerEquipment1.setName("Klimatyzator Split Seria Ray SIH-09BIR+SOH-09BIR");
        installerEquipment1.setPrice(BigDecimal.valueOf(3179.00));
        installerEquipment1.setProducer("Sinclair");
        installerEquipment1.setDescription("Chłodzenie moc 2,5kW, Grzanie moc 2,7kW");

        Set<Offer> installerEquipment1Offers = installerEquipment1.getOffers();
        installerEquipment1Offers.add(offer1);
        installerEquipment1.setOffers(installerEquipment1Offers);

        offerInstallerEquipments.add(installerEquipment1);
        offer1.setInstallerEquipments(offerInstallerEquipments);
    }

    @Test
    public void findAllEquipmentInOffer_WhenGivenOfferId_ThenShouldReturnInstallerEquipmentDtoStructure(){

        //given
        when(offerRepository.findById(offer1.getId())).thenReturn(Optional.of(offer1));

        //when
        Page<InstallerEquipmentDto> receivedPage =  offerService.findAllEquipmentInOffer(offer1.getId());

        //then
        assertEquals("Number of elements in received page is incorrect",receivedPage.getTotalElements(),offerInstallerEquipments.size());
    }

    @Test
    public void assignEquipmentToOffer_WhenGivenOfferIdAndEquipmentId_ThenShouldExecuteRepositoryMethodSaveTwice(){
        //given
        when(offerRepository.findById(offer1.getId()))
                .thenReturn(Optional.ofNullable(offer1));
        when(installerEquipmentService.findById(installerEquipment1.getId()))
                .thenReturn(installerEquipment1);

        //when
        offerService.assignEquipmentToOffer(offer1.getId(),installerEquipment1.getId());

        //then
        verify(installerEquipmentRepository, times(1)).save(any(InstallerEquipment.class));
        verify(offerRepository, times(1)).save(any(Offer.class));
    }

    @Test
    public void _WhenGivenOfferIdAndEquipmentId_ThenShouldExecuteRepositoryMethodSaveTwice(){
        //given
        when(offerRepository.findById(offer1.getId()))
                .thenReturn(Optional.ofNullable(offer1));
        when(installerEquipmentService.findById(installerEquipment1.getId()))
                .thenReturn(installerEquipment1);

        //when
        offerService.revertAssigningEquipmentFromOffer(offer1.getId(),installerEquipment1.getId());

        //then
        verify(installerEquipmentRepository, times(1)).save(any(InstallerEquipment.class));
        verify(offerRepository, times(1)).save(any(Offer.class));
    }

    @Test
    public void findOfferByServiceId_WhenGivenServiceId_ThenShouldReturnMatchingOfferDtoObject(){
        //given
        when(serviceService.findById(service1.getId()))
                .thenReturn(service1);

        //when
        OfferDto offerDto = offerService.findOfferByServiceId(service1.getId());

        //then
        assertTrue("Actual value does not match expected value", offerDto.getId() == offer1.getId());
    }

    @Test
    public void assignServiceToOffer_WhenGivenServiceIdAndOfferId_ThenShouldExecuteRepositoryMethodSaveTwice(){
        //given
        when(serviceService.findById(service1.getId()))
                .thenReturn(service1);
        when(offerRepository.findById(offer1.getId()))
                .thenReturn(Optional.of(offer1));

        //when
        offerService.assignServiceToOffer(service1.getId(),offer1.getId());

        //then
        verify(serviceRepository, times(1)).save(any(Service.class));
        verify(offerRepository, times(1)).save(any(Offer.class));
    }

    @Test
    public void revertAssigningServiceFromOffer_WhenGivenServiceId_ThenShouldExecuteRepositoryMethodSaveTwice(){
        //given
        when(serviceService.findById(service1.getId()))
                .thenReturn(service1);

        //when
        offerService.revertAssigningServiceFromOffer(service1.getId());

        //then
        verify(serviceRepository, times(1)).save(any(Service.class));
        verify(offerRepository, times(1)).save(any(Offer.class));
    }

    @Test
    public void findUserAssignedToOffer_WhenGivenOfferId_ThenShouldReturnUserDtoAssignedToOffer(){
        //given
        when(offerRepository.findById(offer1.getId()))
                .thenReturn(Optional.of(offer1));

        //when
        UserDto received = offerService.findUserAssignedToOffer(offer1.getId());

        //then
        assertTrue("Actual value does not match expected value",client1.getId() == received.getId());
        assertEquals("Actual value does not match expected value", client1.getFirstName(), received.getFirstName());
        assertEquals("Actual value does not match expected value", client1.getLastName(), received.getLastName());
        assertEquals("Actual value does not match expected value", client1.getEmail(), received.getEmail());
        assertEquals("Actual value does not match expected value", client1.getTelephone(), received.getTelephone());
        assertEquals("Actual value does not match expected value", client1.getLogin(), received.getLogin());
        assertEquals("Actual value does not match expected value", client1.getPassword(), received.getPassword());
    }

    @Test
    public void assignUserToOffer_WhenGivenOfferIdAndUserId_ThenShouldExecuteRepositoryMethodSaveTwice(){
        //given
        when(offerRepository.findById(offer1.getId()))
                .thenReturn(Optional.of(offer1));
        when(userService.findById(client1.getId()))
                .thenReturn(client1);

        //when
        offerService.assignUserToOffer(offer1.getId(), client1.getId());

        //then
        verify(userRepository, times(1)).save(any(User.class));
        verify(offerRepository, times(1)).save(any(Offer.class));
    }

    @Test
    public void revertAssigningUserFromOffer_WhenGivenOfferId_ThenShouldExecuteRepositoryMethodSaveTwice(){
        //given
        when(offerRepository.findById(offer1.getId()))
                .thenReturn(Optional.of(offer1));

        //when
        offerService.revertAssigningUserFromOffer(offer1.getId());

        //then
        verify(userRepository, times(1)).save(any(User.class));
        verify(offerRepository, times(1)).save(any(Offer.class));
    }

    @Test
    public void updateOfferStatus_WhenGivenOfferIdAndStatusCode_ThenShouldExecuteRepositorySaveMethodOnce(){
        //given
        when(offerRepository.findById(offer1.getId()))
                .thenReturn(Optional.of(offer1));

        //when
        offerService.updateOfferStatus(offer1.getId(),"OFERTA_ODRZUCONA");

        //then
        verify(offerRepository, times(1)).save(any(Offer.class));
    }

    @Test
    public void deleteAllOfferEquipment_WhenGivenOfferId_ThenShouldExecuteRepositorySaveMethodOnce(){
        //given
        when(offerRepository.findById(offer1.getId()))
                .thenReturn(Optional.of(offer1));

        //when
        offerService.deleteAllOfferEquipment(offer1.getId());

        //then
        verify(offerRepository, times(1)).save(any(Offer.class));
    }

}
