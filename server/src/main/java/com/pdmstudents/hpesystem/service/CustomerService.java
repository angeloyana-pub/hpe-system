package com.pdmstudents.hpesystem.service;

import com.pdmstudents.hpesystem.model.Customer;
import com.pdmstudents.hpesystem.repository.CustomerRepository;
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
public class CustomerService {
  private CustomerRepository repo;

  public CustomerService(CustomerRepository repo) {
    this.repo = repo;
  }

  public Page<Customer> getCustomers(
      Long id, String firstName, String lastName, int page, int perPage) {
    Pageable pageable = PageRequest.of(page - 1, perPage);
    return repo.getCustomers(
        id,
        firstName == null || firstName.isEmpty() ? null : firstName,
        lastName == null || lastName.isEmpty() ? null : lastName,
        pageable);
  }

  public List<Customer> getAllCustomers() {
    return repo.findAll();
  }

  public Customer createCustomer(Customer customer) {
    return repo.save(customer);
  }

  public Customer updateCustomer(Long id, Customer updatedCustomer) {
    return repo.findById(id)
        .map(
            customer -> {
              if (updatedCustomer.getFirstName() != null) {
                customer.setFirstName(updatedCustomer.getFirstName());
              }
              if (updatedCustomer.getLastName() != null) {
                customer.setLastName(updatedCustomer.getLastName());
              }
              if (updatedCustomer.getPhone() != null) {
                customer.setPhone(updatedCustomer.getPhone());
              }
              if (updatedCustomer.getEmail() != null) {
                customer.setEmail(updatedCustomer.getEmail());
              }
              if (updatedCustomer.getAddress() != null) {
                customer.setAddress(updatedCustomer.getAddress());
              }
              return repo.save(customer);
            })
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  public void deleteCustomer(Long id) {
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
