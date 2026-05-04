package io.jacobryan.Application.services;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class RateLimiterService
{

	private static final int MAX_REQUESTS = 10; //max requests per hour
	private static final long WINDOW_SECONDS = 3600; // 1 hour

	private final Cache<String, List<Long>> userRequestCache = Caffeine.newBuilder()
			.expireAfterWrite(WINDOW_SECONDS, TimeUnit.SECONDS)
			.build();

	public boolean isAllowed(String email)
	{
		long now = Instant.now().getEpochSecond();

		List<Long> timestamps = userRequestCache.get(email, k -> new LinkedList<>());

		// Remove timestamps older than the window
		timestamps.removeIf(t -> (now - t) > WINDOW_SECONDS);

		if (timestamps.size() >= MAX_REQUESTS)
		{
			return false;
		}

		timestamps.add(now); // Record this attempt
		userRequestCache.put(email, timestamps);
		return true;
	}
}