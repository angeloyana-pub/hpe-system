package com.pdmstudents.hpesystem.cli;

import com.pdmstudents.hpesystem.model.User;
import com.pdmstudents.hpesystem.repository.UserRepository;
import java.util.Scanner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CreateUser implements CommandLineRunner {
  private final UserRepository repo;
  private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  public CreateUser(UserRepository repo) {
    this.repo = repo;
  }

  @Override
  public void run(String... args) {
    if (args.length == 0 || !"create-user".equals(args[0])) return;
    Scanner scanner = new Scanner(System.in);

    try {
      System.out.println("\nCreate User");
      System.out.println("===========");
      System.out.print("Username: ");
      String username = scanner.nextLine().trim();
      System.out.print("Password: ");
      String password = scanner.nextLine().trim();

      User user = new User();
      user.setUsername(username);
      user.setPassword(passwordEncoder.encode(password));
      repo.save(user);
      System.out.println("User has been created!");
    } finally {
      scanner.close();
    }
  }
}
