import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Swal from "sweetalert2";
import { HomeProductionTypes } from "../data-type/HomeProduction";
import ModalAddProduction from "../components/ModalAddProduction";

const Production = () => {
  const [data, setData] = useState<HomeProductionTypes[]>([]);
  const [update, setUpdate] = useState<boolean>(false);

  const _getProduction = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/homeproduction?WMM-KEY=${process.env.REACT_APP_KEY}`,
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
    _getProduction();
  }, [update]);

  const handleRemove = async (event: React.MouseEvent, id: string) => {
    Swal.fire({
      title: "anda yakin ingin menghapus home production?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(
          `${process.env.REACT_APP_BASEURL}/homeproduction`,
          {
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
          }
        );

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
        <ModalAddProduction setUpdate={setUpdate} update={update} />
        <div className='grid grid-cols-2 md:grid-cols-5 gap-10 justify-center items-center text-center'>
          {data.map((item) => {
            return (
              <div
                key={item.id_homeproduction}
                className='flex flex-col space-y-2 border rounded-md shadow p-2'>
                <img
                  src={process.env.REACT_APP_URL_ASSET + "logo/" + item.logo}
                  className='w-full h-44 object-contain'
                />
                <p className='font-bold line-clamp-1'>{item.nama}</p>
                <p className='text-sm line-clamp-1'>Pemilik : {item.pemilik}</p>
                <p className='text-sm line-clamp-1'>Email : {item.email}</p>
                <p className='text-sm line-clamp-1'>Alamat : {item.alamat}</p>
                <p className='text-sm line-clamp-1'>No tlp : {item.no_tlp}</p>
                <p className='text-sm line-clamp-1'>Website : {item.website}</p>
                <p className='text-sm line-clamp-1'>
                  Instagram : {item.instagram}
                </p>
                <p className='text-sm line-clamp-1'>
                  Facebook : {item.facebook}
                </p>
                <p className='text-sm line-clamp-1'>Twitter : {item.twitter}</p>

                <p className='text-sm line-clamp-1'>
                  Tahun Rilis : {item.tahun_berdiri}
                </p>
                <button
                  onClick={(event) =>
                    handleRemove(event, item.id_homeproduction)
                  }
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

export default Production;
