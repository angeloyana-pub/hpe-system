package com.pdmstudents.hpesystem.service;

import com.pdmstudents.hpesystem.model.Tag;
import com.pdmstudents.hpesystem.repository.TagRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TagService {
  private TagRepository repo;

  public TagService(TagRepository repo) {
    this.repo = repo;
  }

  public List<Tag> getTags() {
    return repo.findAll();
  }

  public Tag createTag(Tag tag) {
    return repo.save(tag);
  }

  public Tag updateTag(Long id, Tag updatedTag) {
    return repo.findById(id)
        .map(
            tag -> {
              if (updatedTag.getName() != null) {
                tag.setName(updatedTag.getName());
              }
              return repo.save(tag);
            })
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  public void deleteTag(Long id) {
    repo.findById(id)
        .ifPresentOrElse(
            repo::delete,
            () -> {
              throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            });
  }
}
