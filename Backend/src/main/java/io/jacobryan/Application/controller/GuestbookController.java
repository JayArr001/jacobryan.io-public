package io.jacobryan.Application.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;
import io.jacobryan.Application.config.GuestbookPostRequest;
import io.jacobryan.Application.model.Guestbook;
import io.jacobryan.Application.model.User;
import io.jacobryan.Application.repository.GuestbookRepository;
import io.jacobryan.Application.repository.UserRepository;
import io.jacobryan.Application.services.RateLimiterService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/guestbook")
public class GuestbookController
{
	@GetMapping("/api/csrf")
	public ResponseEntity<?> getCsrfToken(CsrfToken token)
    {
		return ResponseEntity.ok().body(Map.of("token", token.getToken()));
	}

	private final GuestbookRepository guestbookRepository;
	private final UserRepository userRepository;
	private final RateLimiterService rateLimiterService;

	public GuestbookController(GuestbookRepository guestbookRepository,
							   UserRepository userRepository,
							   RateLimiterService rateLimiterService)
	{
		this.guestbookRepository = guestbookRepository;
		this.userRepository = userRepository;
		this.rateLimiterService = rateLimiterService;
	}

	@GetMapping
	public List<Guestbook> getAllEntries()
	{
		return guestbookRepository.findByDeletedFalseOrderByDateCreatedDesc();
	}

	@PostMapping
	public ResponseEntity<?> postEntry(@RequestBody GuestbookPostRequest request,
			@AuthenticationPrincipal OAuth2User principal)
    {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (principal == null)
		{
			return ResponseEntity.status(401).body("Unauthorized");
		}

		String email = principal.getAttribute("email");
		if (email == null)
		{
			return ResponseEntity.badRequest().body("Email not found in OAuth2 principal.");
		}

		if (!rateLimiterService.isAllowed(email))
		{
			return ResponseEntity.status(429).body("Rate limit exceeded. Please wait before posting again.");
		}

		Optional<User> userOptional = userRepository.findByEmail(email);
		if (userOptional.isEmpty())
		{
			return ResponseEntity.badRequest().body("User not found in database.");
		}

		User user = userOptional.get();

		String message = request.getMessage();
		if (message == null || message.trim().isEmpty() || message.length() > 1000)
		{
			return ResponseEntity.badRequest().body("Invalid message. Must be 1-1000 characters.");
		}
		Guestbook entry = new Guestbook(user, message.trim());
		guestbookRepository.save(entry);

		return ResponseEntity.ok(entry);
	}

	@PutMapping("/{id}/delete")
	public ResponseEntity<?> softDeleteEntry(@PathVariable Long id,
			@AuthenticationPrincipal OAuth2User principal)
    {
		if (principal == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		String email = principal.getAttribute("email");
		Optional<Guestbook> entryOpt = guestbookRepository.findById(id);

		if (entryOpt.isEmpty())
		{
			return ResponseEntity.notFound().build();
		}
		Guestbook entry = entryOpt.get();

		boolean isAuthor = entry.getUser().getEmail().equalsIgnoreCase(email);

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		boolean isAdmin = auth.getAuthorities().stream()
				.anyMatch(ga -> ga.getAuthority().equals("ROLE_ADMIN"));

		if (!isAuthor && !isAdmin)
		{
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
		entry.setDeleted(true);
		guestbookRepository.save(entry);

		return ResponseEntity.ok("delete success.");
	}
}