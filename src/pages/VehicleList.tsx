import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetModelsQuery, useGetMakesQuery, useDeleteModelMutation } from '../api';
import { VehicleModelCard, VehicleFilters, VehicleSorting, Pagination } from '../components';
import { SortParams, FilterParams } from '../types';

const VehicleList: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [selectedMakeId, setSelectedMakeId] = useState<number | null>(null);
  const [sort, setSort] = useState<SortParams>({ field: 'name', direction: 'asc' });

  const queryParams = useMemo(() => ({
    page,
    limit,
    sort,
    filter: {
      search: search.trim() || undefined,
      makeId: selectedMakeId || undefined,
    } as FilterParams,
  }), [page, limit, sort, search, selectedMakeId]);

  const { data: modelsData, isLoading: modelsLoading, error: modelsError } = useGetModelsQuery(queryParams);
  const { data: makes = [], isLoading: makesLoading } = useGetMakesQuery();
  const [deleteModel] = useDeleteModelMutation();

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this vehicle model?')) {
      try {
        await deleteModel(id).unwrap();
      } catch (error) {
        console.error('Failed to delete model:', error);
        alert('Failed to delete model. Please try again.');
      }
    }
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };

  const handleMakeChange = (makeId: number | null) => {
    setSelectedMakeId(makeId);
    setPage(1);
  };

  const handleSortChange = (newSort: SortParams) => {
    setSort(newSort);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedMakeId(null);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  if (modelsLoading || makesLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (modelsError) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
        <p>Error loading vehicle models. Please try again.</p>
      </div>
    );
  }

  const models = modelsData?.data || [];
  const totalPages = modelsData?.totalPages || 0;
  const totalItems = modelsData?.total || 0;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Vehicle Models</h2>
        <button
          onClick={() => navigate('/create')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Add New Model
        </button>
      </div>

      <VehicleFilters
        search={search}
        selectedMakeId={selectedMakeId}
        makes={makes}
        onSearchChange={handleSearchChange}
        onMakeChange={handleMakeChange}
        onClearFilters={handleClearFilters}
      />

      <VehicleSorting
        sort={sort}
        onSortChange={handleSortChange}
      />

      {models.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
          <p>No vehicle models found.</p>
          {(search || selectedMakeId) && (
            <button
              onClick={handleClearFilters}
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px',
            marginBottom: '20px'
          }}>
            {models.map(model => (
              <VehicleModelCard
                key={model.id}
                model={model}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={limit}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      )}
    </div>
  );
};

export default VehicleList;