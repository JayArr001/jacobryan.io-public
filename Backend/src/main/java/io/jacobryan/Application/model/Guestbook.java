package io.jacobryan.Application.model;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "Guestbook")
public class Guestbook
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String message;

    @Column(name = "date_created", nullable = false, updatable = false)
    private Instant dateCreated = Instant.now();

	@Column(name = "deleted")
	private boolean deleted = false;

	public boolean isDeleted()
	{
		return deleted;
	}

	public void setDeleted(boolean deleted)
	{
		this.deleted = deleted;
	}

	public Guestbook() {}

	public Guestbook(User user, String message)
	{
		this.user = user;
		this.message = message;
	}

	public Long getId()
	{
		return id;
	}

	public User getUser()
	{
		return user;
	}

	public void setUser(User user)
	{
		this.user = user;
	}

	public String getMessage()
	{
		return message;
	}

	public void setMessage(String message)
	{
		this.message = message;
	}

	public Instant getDateCreated()
	{
		return dateCreated;
	}
}
