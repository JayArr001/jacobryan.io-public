package io.jacobryan.Application.repository;

import org.springframework.data.repository.CrudRepository;
import io.jacobryan.Application.model.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long>
{
	Optional<User> findByEmail(String email);
}