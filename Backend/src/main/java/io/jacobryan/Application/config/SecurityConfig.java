package io.jacobryan.Application.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import io.jacobryan.Application.controller.CsrfTokenLoggingFilter;
import io.jacobryan.Application.services.CustomOAuth2UserService;

//7:44 and loving life
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig
{

    private final String frontendURL = "/";
    
	private final CustomOAuth2UserService customOAuth2UserService;
	public SecurityConfig(CustomOAuth2UserService customOAuth2UserService)
	{
		this.customOAuth2UserService = customOAuth2UserService;
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception
	{
		CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
		requestHandler.setCsrfRequestAttributeName("_csrf");
		http
			.addFilterBefore(new CsrfTokenLoggingFilter(), CsrfFilter.class)
			.csrf(csrf -> csrf
				.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
				.csrfTokenRequestHandler(requestHandler))
                .authorizeHttpRequests(authorize -> authorize
                        //frontend
                        .requestMatchers("/", "/index.html", "/assets/**", "/favicon.ico", "/*.js",
                                "/*.css").permitAll()

                        //public api
                        .requestMatchers("/api/csrf", "/api/user", "/api/user/me").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/blog/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/guestbook").permitAll()

                        //protected api
                        .requestMatchers("/api/**").authenticated()
                        .requestMatchers("/blog/*/edit").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/blog/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/blog/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/blog/**").hasRole("ADMIN")

                        //react routes
                        .anyRequest().permitAll()
                )
			.oauth2Login(oauth2 -> oauth2
				.userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService)
				)
				.defaultSuccessUrl(frontendURL, true) // React app redirect
				.failureHandler((request, response,
                exception) ->
                {
					response.sendRedirect(frontendURL); //on fail/cancel
				})
			)
			.logout(logout -> logout
				.logoutSuccessUrl(frontendURL)
				.invalidateHttpSession(true)
				.clearAuthentication(true)
				.deleteCookies("JSESSIONID")
			)
			.exceptionHandling(exception -> exception
				.defaultAuthenticationEntryPointFor(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED),
					request -> request.getRequestURI().startsWith("/api/"))
			);
		return http.build();
	}

}