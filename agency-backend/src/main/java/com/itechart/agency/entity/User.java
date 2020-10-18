package com.itechart.agency.entity;

import com.itechart.agency.entity.lists.Role;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Email cannot be null")
    @Size(min = 7, max = 50, message = "Email must be between 7 and 50 characters")
    @Column(name = "email", unique = true)
    private String email;

    @NotNull(message = "Password cannot be null")
    @Size(min = 1, max = 255, message = "Password must be between 1 and 255 characters")
    @Column(name = "password")
    private String password;

    @NotNull(message = "Agency for user cannot be null")
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "agency_id", referencedColumnName = "id")
    private Agency agency;

    @Column(name = "is_deactivated")
    private Boolean isDeactivated;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @ManyToMany(cascade = {CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = {
            @JoinColumn(name = "user_id")}, inverseJoinColumns = {
            @JoinColumn(name = "role_id")})
    private List<Role> roles;

    public User(@NotNull(message = "Email cannot be null") @Size(min = 7, max = 50, message = "Email must be between 7 and 50 characters") String email, @NotNull(message = "Password cannot be null") @Size(min = 1, max = 255, message = "Password must be between 1 and 255 characters") String password, @NotNull(message = "Agency for user cannot be null") Agency agency,Boolean isDeactivated, Boolean isDeleted, List<Role> roles) {
        this.email = email;
        this.password = password;
        this.agency = agency;
        this.isDeactivated = isDeactivated;
        this.isDeleted = isDeleted;
        this.roles = roles;
    }


}
