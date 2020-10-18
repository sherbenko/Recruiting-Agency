package com.itechart.agency.dto;

import com.itechart.agency.entity.Agency;
import com.itechart.agency.entity.lists.Role;
import com.itechart.agency.entity.User;
import lombok.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class UserDto {

    private Long id;
    private String email;
    private String agencyName;
    private Long agencyId;
    private Boolean isDeactivated;
    private Boolean isDeleted;
    private List<Role> roles;

    public static UserDto.Builder newBuilder() {
        return new UserDto().new Builder();
    }



    public UserDto(String email, Long agencyId) {
        this.email = email;
        this.agencyId = agencyId;

    }

    public class Builder {
        private Builder() {
        }

        public UserDto.Builder withId(final Long id) {
            UserDto.this.setId(id);
            return this;
        }

        public UserDto.Builder withName(final String email) {
            UserDto.this.email = email;
            return this;
        }

        public UserDto.Builder withUserId(final Long agencyId) {
            UserDto.this.agencyId = agencyId;
            return this;
        }

        public UserDto.Builder withAgencyId(final Boolean isDeleted) {
            UserDto.this.isDeleted = isDeleted;
            return this;
        }



        public UserDto.Builder withAddressId(final List<Role> roles) {
            UserDto.this.roles = roles;
            return this;
        }


        public UserDto build() {
            return UserDto.this;
        }
    }


    public static UserDto convertEntityToDto(User entity) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(entity, UserDto.class);
    }

    public static User convertDtoToEntity(UserDto dto) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(dto, User.class);
    }


}
