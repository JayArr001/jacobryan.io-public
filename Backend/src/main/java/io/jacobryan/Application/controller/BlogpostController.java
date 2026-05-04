package io.jacobryan.Application.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;
import io.jacobryan.Application.model.Blogpost;
import io.jacobryan.Application.model.User;
import io.jacobryan.Application.repository.BlogpostRepository;
import io.jacobryan.Application.repository.UserRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/blog")
public class BlogpostController
{
	@GetMapping("/api/csrf")
	public ResponseEntity<?> getCsrfToken(CsrfToken token)
    { return ResponseEntity.ok().body(Map.of("token", token.getToken())); }

	private final BlogpostRepository repository;
	private final UserRepository userRepository;

	public BlogpostController(BlogpostRepository repository, UserRepository userRepository)
	{
		this.repository = repository;
		this.userRepository = userRepository;
	}

	@GetMapping
	public List<Blogpost> getAllPosts() {
		return repository.findByDeletedFalse();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Blogpost> getPostById(@PathVariable Long id)
	{
		return repository.findById(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> createPost(@RequestBody Blogpost post,
										@AuthenticationPrincipal OAuth2User principal)
	{
		if (principal == null)
		{
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
		}

		String email = principal.getAttribute("email");
		if (email == null)
		{
			return ResponseEntity.badRequest().body("Email not found in OAuth2 principal.");
		}

		Optional<User> userOptional = userRepository.findByEmail(email);
		if (userOptional.isEmpty())
		{
			return ResponseEntity.badRequest().body("User not found in database.");
		}
		User user = userOptional.get();
		post.setUser(user);

		// Validate title
		if (post.getTitle() == null || post.getTitle().trim().isEmpty())
		{
			return ResponseEntity.badRequest().body("Title cannot be empty.");
		}

		// Validate content
		String message = post.getContent();
		if (message == null || message.trim().isEmpty() || message.length() > 20000)
		{
			return ResponseEntity.badRequest().body("Invalid message. Must be 1–20,000 characters.");
		}

		Blogpost savedPost = repository.save(post);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedPost);
	}


	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Blogpost> updatePost(@PathVariable Long id, @RequestBody Blogpost updatedPost)
	{
		return repository.findById(id).map(post -> {
			post.setTitle(updatedPost.getTitle());
			post.setContent(updatedPost.getContent());
			// keep the existing user instead of overwriting with null
			if (updatedPost.getUser() != null) {
				post.setUser(updatedPost.getUser());
			}
			return ResponseEntity.ok(repository.save(post));
		}).orElse(ResponseEntity.notFound().build());
	}

	@PutMapping("/{id}/delete")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> softDeleteBlogpost(@PathVariable Long id, @AuthenticationPrincipal OAuth2User principal)
	{
		if (principal == null)
		{
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		Optional<Blogpost> optionalPost = repository.findById(id);
		if (optionalPost.isEmpty())
        {
			return ResponseEntity.notFound().build();
		}

		Blogpost post = optionalPost.get();
		post.setDeleted(true);
		repository.save(post);

		return ResponseEntity.ok().build();
	}
}
