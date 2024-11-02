'use client'
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useState, useEffect } from "react";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

export type HttpParams = {
  page: string;
  limit: string;
  orderBy: string;
  order: string;
  role: string;
  search?: string;
};

type FilterProps = {
  httpParams: HttpParams;
  setHttpParams: React.Dispatch<React.SetStateAction<HttpParams>>;
  totalPages: number;
};

export function Filter(props: FilterProps) {
  const [search, setSearch] = useState(props.httpParams.search || '');

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      props.setHttpParams((prevParams) => ({
        ...prevParams,
        search,
        page: '1',
      }));
    }, 300);

    return () => clearTimeout(debounceSearch);
  }, [search, props]);

  const handlePageChange = (direction: 'next' | 'previous') => {
    const currentPage = parseInt(props.httpParams.page, 10) || 1;
    const newPage = direction === 'next' ? currentPage + 1 : Math.max(1, currentPage - 1);

    props.setHttpParams((prevParams) => ({
      ...prevParams,
      page: String(newPage),
    }));
  };

  return (
    <div className="w-full flex justify-between mb-5">
      <div className="flex gap-3">
        <Input
          type="search"
          placeholder="Procurar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-72"
        />
      </div>

      <div className="flex gap-5 items-center">
        <Button
          className="bg-white border text-black shadow-sm hover:bg-neutral-100"
          onClick={() => handlePageChange('previous')}
          disabled={parseInt(props.httpParams.page, 10) === 1}
        >
          <IoArrowBackOutline />
        </Button>

        <span>{props.httpParams.page || '1'}</span>

        <Button
          className="bg-white border text-black shadow-sm hover:bg-neutral-100"
          onClick={() => handlePageChange('next')}
          disabled={parseInt(props.httpParams.page, 10) >= props.totalPages}
        >
          <IoArrowForwardOutline />
        </Button>
      </div>
    </div>
  );
}
