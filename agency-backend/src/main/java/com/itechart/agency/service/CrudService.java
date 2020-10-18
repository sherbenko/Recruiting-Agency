package com.itechart.agency.service;

import java.util.List;

public interface CrudService<T> {
    Long create(final T t);

    T findById(final Long id);

    List<T> findAll();
/**/
    Long update(final T t);

    void deleteById(final Long id);

    void delete(final T t);
}
