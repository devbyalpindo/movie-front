import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FilmTypes } from "../data-type/Film";
import Swal from "sweetalert2";
import ModalAddFilm from "../components/ModalAddFilm";

const Film = () => {
  const [data, setData] = useState<FilmTypes[]>([]);
  const [update, setUpdate] = useState<boolean>(false);

  const _getFilm = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/film?WMM-KEY=${process.env.REACT_APP_KEY}`,
      {
        headers: {
          "Content-Type": "Applications/json",
          Authorization:
            "Basic " +
            btoa(
              process.env.REACT_APP_USERNAME +
                ":" +
                process.env.REACT_APP_PASSWORD
            ),
        },
      }
    );
    const json = await response.json();
    if (json.status) {
      setData(json.data);
    }
  };

  useEffect(() => {
    _getFilm();
  }, [update]);

  const handleRemove = async (event: React.MouseEvent, id: string) => {
    Swal.fire({
      title: "anda yakin ingin menghapus film?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/film`, {
          method: "DELETE",
          body: new URLSearchParams({
            id: id,
            "WMM-KEY": process.env.REACT_APP_KEY!,
          }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Authorization:
              "Basic " +
              btoa(
                process.env.REACT_APP_USERNAME +
                  ":" +
                  process.env.REACT_APP_PASSWORD
              ),
          },
        });

        const json = await response.json();
        if (json.status) {
          Swal.fire("Berhasil dihapus", "", "success");
          setUpdate(!update);
        }
      }
    });
  };

  return (
    <>
      <Header />
      <div className='mt-4 container mx-auto'>
        <ModalAddFilm setUpdate={setUpdate} update={update} />
        <div className='grid grid-cols-2 md:grid-cols-5 gap-10 justify-center items-center text-center'>
          {data.map((item) => {
            return (
              <div
                key={item.id_film}
                className='flex flex-col space-y-2 border rounded-md shadow p-2'>
                <img
                  src={process.env.REACT_APP_URL_ASSET + item.poster}
                  className='w-full h-44 object-contain'
                />
                <p className='font-bold line-clamp-1'>{item.judul}</p>
                <p className='text-sm line-clamp-1'>Durasi : {item.durasi}</p>
                <p className='text-sm line-clamp-1'>
                  Produser : {item.producer}
                </p>
                <p className='text-sm line-clamp-1'>
                  Penulis Naskah : {item.penulis_naskah}
                </p>
                <p className='text-sm line-clamp-1'>Musik : {item.musik}</p>
                <p className='text-sm line-clamp-1'>Bahasa : {item.bahasa}</p>
                <p className='text-sm line-clamp-1'>Negara : {item.negara}</p>
                <p className='text-sm line-clamp-1'>Rating : {item.rating}</p>
                <p className='text-sm line-clamp-1'>Editor : {item.editor}</p>
                <p className='text-sm line-clamp-1'>
                  Cimatografi : {item.cimatografi}
                </p>
                <p className='text-sm line-clamp-1'>
                  Tahun Rilis : {item.tahun_rilis}
                </p>
                <button
                  onClick={(event) => handleRemove(event, item.id_film)}
                  className='bg-red-500 text-white'>
                  Hapus Data
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Film;
