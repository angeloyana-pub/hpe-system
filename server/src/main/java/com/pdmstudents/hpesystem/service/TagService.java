package com.pdmstudents.hpesystem.service;

import com.pdmstudents.hpesystem.model.Tag;
import com.pdmstudents.hpesystem.repository.TagRepository;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TagService {
  private TagRepository repo;

  public TagService(TagRepository repo) {
    this.repo = repo;
  }

  public Page<Tag> getTags(Long id, String name, int page, int perPage) {
    Pageable pageable = PageRequest.of(page - 1, perPage);
    return repo.getTags(id, name == null || name.isEmpty() ? null : name, pageable);
  }

  public List<Tag> getAllTags() {
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
    try {
      repo.findById(id)
          .ifPresentOrElse(
              repo::delete,
              () -> {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
              });
    } catch (DataIntegrityViolationException ex) {
      if (ex.getRootCause() instanceof SQLIntegrityConstraintViolationException) {
        throw new ResponseStatusException(HttpStatus.CONFLICT);
      } else {
        throw ex;
      }
    }
  }
}
