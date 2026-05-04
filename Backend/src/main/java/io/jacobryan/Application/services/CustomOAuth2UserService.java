package io.jacobryan.Application.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import io.jacobryan.Application.model.User;
import io.jacobryan.Application.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Transactional
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService
{
	@Value("${admin.email}")
	private String adminEmail;

	private final UserRepository userRepository;

	public CustomOAuth2UserService(UserRepository userRepository)
	{
        this.userRepository = userRepository;
	}

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest)
	{
		OAuth2User oAuth2User = super.loadUser(userRequest);

		Map<String, Object> attributes = oAuth2User.getAttributes();
		String name = (String) attributes.get("name");
		String email = (String) attributes.get("email");

		boolean isAdmin = email.equalsIgnoreCase(adminEmail);

		userRepository.findByEmail(email).ifPresentOrElse(user ->
		{
			user.setLastSeen(LocalDateTime.now());
			userRepository.save(user);
		}, () ->
        {
			User newUser = new User(name, email);
			userRepository.save(newUser);
		});

        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

        if (isAdmin)
        {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }

		return new DefaultOAuth2User(authorities, attributes,"email");
	}

}
