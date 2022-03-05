import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { HomeProductionTypes } from "../data-type/HomeProduction";
import { toast } from "react-toastify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  overflowY: "scroll",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface PropsType {
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalAddFilm({ setUpdate, update }: PropsType) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<HomeProductionTypes[]>([]);
  const [payload, setPayload] = React.useState({
    id_film: "",
    id_homeproduction: "",
    judul: "",
    producer: "",
    penulis_naskah: "",
    musik: "",
    cimatografi: "",
    editor: "",
    durasi: "",
    poster: "",
    bahasa: "",
    negara: "",
    rating: "",
    tahun_rilis: "",
  });

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

  React.useEffect(() => {
    _getProduction();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const image = document.getElementsByName("poster")[0] as HTMLInputElement;

    let formData = new FormData();
    formData.append("id_homeproduction", payload.id_homeproduction);
    formData.append("judul", payload.judul);
    formData.append("producer", payload.producer);
    formData.append("penulis_naskah", payload.penulis_naskah);
    formData.append("musik", payload.musik);
    formData.append("cimatografi", payload.cimatografi);
    formData.append("editor", payload.editor);
    formData.append("durasi", payload.durasi);
    formData.append("bahasa", payload.bahasa);
    formData.append("negara", payload.negara);
    formData.append("rating", payload.rating);
    formData.append("tahun_rilis", payload.tahun_rilis);
    formData.append("poster", (image?.files as FileList)[0]);
    formData.append("WMM-KEY", process.env.REACT_APP_KEY as string);

    const response = await fetch(process.env.REACT_APP_BASEURL + "/film", {
      method: "POST",
      body: formData,
      headers: {
        Authorization:
          "Basic " +
          btoa(
            process.env.REACT_APP_USERNAME +
              ":" +
              process.env.REACT_APP_PASSWORD
          ),
      },
    });

    if (response.ok) {
      toast.success("Data berhasil ditambahkan");
      setUpdate(!update);
      handleClose();
    } else {
      toast.error("Gagal menambahkan data");
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        className='ml-4 px-4 py-1 rounded-md mb-2 bg-green-500 text-white'
        onClick={handleOpen}>
        Tambah Data
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className='overflow-y-auto'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Tambah Film
          </Typography>
          <div className='mt-4 flex flex-col space-y-3'>
            <div>
              <label>Id home production :</label>
              <select
                name='id_homeproduction'
                onChange={handleChange}
                className='px-2 w-full border border-gray-500 rounded-sm'>
                {data.map((item) => {
                  return (
                    <option value={item.id_homeproduction}>{item.nama}</option>
                  );
                })}
              </select>
            </div>
            <div>
              <label>Judul :</label>
              <input
                type='text'
                onChange={handleChange}
                name='judul'
                value={payload.judul}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Produser :</label>
              <input
                type='text'
                onChange={handleChange}
                name='producer'
                value={payload.producer}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Penulis Naskah :</label>
              <input
                type='text'
                onChange={handleChange}
                name='penulis_naskah'
                value={payload.penulis_naskah}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Musik :</label>
              <input
                type='text'
                onChange={handleChange}
                name='musik'
                value={payload.musik}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Cimatografi :</label>
              <input
                type='text'
                onChange={handleChange}
                name='cimatografi'
                value={payload.cimatografi}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Editor :</label>
              <input
                type='text'
                onChange={handleChange}
                name='editor'
                value={payload.editor}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Durasi :</label>
              <input
                type='text'
                onChange={handleChange}
                name='durasi'
                value={payload.durasi}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Bahasa :</label>
              <input
                type='text'
                onChange={handleChange}
                name='bahasa'
                value={payload.bahasa}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Negara :</label>
              <input
                type='text'
                onChange={handleChange}
                name='negara'
                value={payload.negara}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Rating :</label>
              <input
                type='text'
                onChange={handleChange}
                name='rating'
                value={payload.rating}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Tahun Rilis :</label>
              <input
                type='text'
                onChange={handleChange}
                name='tahun_rilis'
                value={payload.tahun_rilis}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Poster :</label>
              <input
                type='file'
                onChange={handleChange}
                name='poster'
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
          </div>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className={`mt-5 ${
              loading ? "bg-gray-500" : "bg-green-500"
            } text-white px-4 py-1 rounded-md`}>
            Tambah Data
          </button>
        </Box>
      </Modal>
    </div>
  );
}
