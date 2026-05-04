package io.jacobryan.Application.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/user")
public class UserController
{

	@Value("${admin.email}")
	private String adminEmail;

	@GetMapping
	public ResponseEntity<Map<String, Object>> userInfo(@AuthenticationPrincipal OAuth2User principal)
	{
		if (principal == null)
        {
			// User not logged in
			return ResponseEntity.ok(Collections.singletonMap("isLoggedIn", false));
		}

		// User is logged in, return 200 OK with user details
		Map<String, Object> response = new HashMap<>();
		response.put("isLoggedIn", true);
		response.put("name", principal.getAttribute("name"));
		response.put("email", principal.getAttribute("email"));
		response.put("picture", principal.getAttribute("picture"));

		return ResponseEntity.ok(response);
	}

	@GetMapping("/me")
	public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal OAuth2User principal)
	{
		if (principal == null)
        {
            return ResponseEntity.ok(Collections.singletonMap("isLoggedIn", false));
		}

		String email = principal.getAttribute("email");
		if (email == null) return ResponseEntity.badRequest().body("No email found");

		Map<String, Object> response = new HashMap<>();
		response.put("email", email);
		response.put("name", principal.getAttribute("name"));
		response.put("isAdmin", email.trim().equalsIgnoreCase(adminEmail.trim()));

		return ResponseEntity.ok(response);
	}
}