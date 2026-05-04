package io.jacobryan.Application.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Blog")
public class Blogpost
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(name = "title", nullable = false)
	private String title;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String content;

	@Column(name = "date_created", nullable = false, updatable = false)
	private LocalDateTime dateCreated = LocalDateTime.now();

	@Column(name = "date_updated")
	private LocalDateTime dateUpdated;

	@Column(name = "deleted")
	private boolean deleted = false;

	public Blogpost() {}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public LocalDateTime getDateUpdated()
	{
		return dateUpdated;
	}

	public void setDateUpdated(LocalDateTime dateUpdated)
	{
		this.dateUpdated = dateUpdated;
	}

	public boolean isDeleted()
	{
		return deleted;
	}

	public void setDeleted(boolean deleted)
	{
		this.deleted = deleted;
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

	public String getContent()
	{
		return content;
	}

	public void setContent(String content)
	{
		this.content = content;
	}

	public LocalDateTime getDateCreated()
	{
		return dateCreated;
	}

	@PrePersist
	protected void onCreate()
	{
		this.dateCreated = LocalDateTime.now();
	}

	@PreUpdate
	protected void onUpdate()
	{
		this.dateUpdated = LocalDateTime.now();
	}
}
