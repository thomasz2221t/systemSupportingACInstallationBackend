package pl.polsl.acsupport.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.acsupport.entities.Offer;

@Repository
public interface OfferRepository extends CrudRepository<Offer, Long>, PagingAndSortingRepository<Offer,Long> {
}
