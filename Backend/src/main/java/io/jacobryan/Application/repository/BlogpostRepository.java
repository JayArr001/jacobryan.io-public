package io.jacobryan.Application.repository;

import org.springframework.data.repository.ListCrudRepository;
import io.jacobryan.Application.model.Blogpost;

import java.util.List;

public interface BlogpostRepository extends ListCrudRepository<Blogpost, Long>
{

	// Get all non-deleted posts
	List<Blogpost> findByDeletedFalse();

	// Optional: get all posts by a user (excluding deleted)
	List<Blogpost> findByUserIdAndDeletedFalse(Long userId);
}
