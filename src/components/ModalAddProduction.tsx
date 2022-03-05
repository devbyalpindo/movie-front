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

export default function ModalAddProduction({ setUpdate, update }: PropsType) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = React.useState<HomeProductionTypes[]>([]);
  const [payload, setPayload] = React.useState({
    nama: "",
    pemilik: "",
    tahun_berdiri: "",
    email: "",
    alamat: "",
    no_tlp: "",
    logo: "",
    website: "",
    instagram: "",
    facebook: "",
    twitter: "",
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
    const image = document.getElementsByName("logo")[0] as HTMLInputElement;

    let formData = new FormData();
    formData.append("nama", payload.nama);
    formData.append("pemilik", payload.pemilik);
    formData.append("tahun_berdiri", payload.tahun_berdiri);
    formData.append("email", payload.email);
    formData.append("alamat", payload.alamat);
    formData.append("no_tlp", payload.no_tlp);
    formData.append("website", payload.website);
    formData.append("instagram", payload.instagram);
    formData.append("facebook", payload.facebook);
    formData.append("twitter", payload.twitter);
    formData.append("logo", (image?.files as FileList)[0]);
    formData.append("WMM-KEY", process.env.REACT_APP_KEY as string);

    const response = await fetch(
      process.env.REACT_APP_BASEURL + "/homeproduction",
      {
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
      }
    );

    if (response.ok) {
      toast.success("Data berhasil ditambahkan");
      setUpdate(!update);
      handleClose();
    } else {
      toast.error("Gagal menambahkan data");
    }
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
              <label>Nama :</label>
              <input
                type='text'
                onChange={handleChange}
                name='nama'
                value={payload.nama}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Pemilik :</label>
              <input
                type='text'
                onChange={handleChange}
                name='pemilik'
                value={payload.pemilik}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Tahun Berdiri :</label>
              <input
                type='text'
                onChange={handleChange}
                name='tahun_berdiri'
                value={payload.tahun_berdiri}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Email :</label>
              <input
                type='text'
                onChange={handleChange}
                name='email'
                value={payload.email}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Alamat :</label>
              <input
                type='text'
                onChange={handleChange}
                name='alamat'
                value={payload.alamat}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>No Tlp :</label>
              <input
                type='text'
                onChange={handleChange}
                name='no_tlp'
                value={payload.no_tlp}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Website :</label>
              <input
                type='text'
                onChange={handleChange}
                name='website'
                value={payload.website}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Instagram :</label>
              <input
                type='text'
                onChange={handleChange}
                name='instagram'
                value={payload.instagram}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Facebook :</label>
              <input
                type='text'
                onChange={handleChange}
                name='facebook'
                value={payload.facebook}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Twitter :</label>
              <input
                type='text'
                onChange={handleChange}
                name='twitter'
                value={payload.twitter}
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
            <div>
              <label>Logo :</label>
              <input
                type='file'
                onChange={handleChange}
                name='logo'
                className='px-2 w-full border border-gray-500 rounded-sm'
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className='mt-5 bg-green-500 text-white px-4 py-1 rounded-md'>
            Tambah Data
          </button>
        </Box>
      </Modal>
    </div>
  );
}
