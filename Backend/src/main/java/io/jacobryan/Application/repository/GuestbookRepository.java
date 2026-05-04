package io.jacobryan.Application.repository;

import org.springframework.data.repository.ListCrudRepository;
import io.jacobryan.Application.model.Guestbook;

import java.util.List;

public interface GuestbookRepository extends ListCrudRepository<Guestbook, Long>
{
	List<Guestbook> findByDeletedFalseOrderByDateCreatedDesc();
}
