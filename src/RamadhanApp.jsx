/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function RamadhanListApp() {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState(""); //nama kegiatan
  const [editedTime, setEditedTime] = useState(""); //waktu
  const [searchTerm, setSearchTerm] = useState(""); //input search real-time
  const [currentWaktu, setCurrentWaktu] = useState(new Date()); //waktu saat ini (real-time)
  const [filter, setFilter] = useState("All"); //untuk button search

  //Untuk waktu real-time
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWaktu(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Fungsi untuk menambahkan item baru
  const addItem = (newItem) => {
    // Memeriksa apakah nama dan waktu item kosong
    if (newItem.name.trim() === "" && newItem.time.trim() === "") {
      // alert("Tidak ada data apapun yang akan dimasukkan!");
      Swal.fire({
        icon: "info",
        title: "Lohh...",
        text: "Kamu belum mengisi data apapun!",
      });
      return;
    }
    // Memeriksa apakah nama item kosong
    if (newItem.name.trim() === "") {
      // alert("Nama ritual tidak boleh kosong!");
      Swal.fire({
        icon: "info",
        title: "Info sob..",
        text: "Nama ritualmu belum diisi nih! Yuk isi dulu!",
      });
      return;
    }
    // Memeriksa apakah waktu item kosong
    if (newItem.time.trim() === "") {
      // alert("Waktu tidak boleh kosong!");
      Swal.fire({
        icon: "info",
        title: "Info sob..",
        text: "Waktumu belum diisi nih! Yuk isi dulu!",
      });
      return;
    }

    // Memeriksa apakah waktu sudah ada pada list
    const itemExists = items.some(
      // (item) => item.time.trim().toLowerCase() === newItem.time.trim().toLowerCase()
      (item) => item.time === newItem.time
    );
    if (itemExists) {
      //alert("Di waktu itu sudah ada ritualnya sob! Coba pilih waktu lainnya!");
      Swal.fire({
        icon: "error",
        title: "Opps...",
        text: "Waktu sudah ada ritualnya sob. Coba cari waktu lainnya!",
      });
      return;
    }

    // Menambahkan item baru ke dalam array items
    setItems([...items, newItem]);

    // Mengurutkan items berdasarkan waktu setelah menambahkan item baru
    setItems((items) =>
      items.sort((a, b) => {
        const timeA = a.time;
        const timeB = b.time;
        if (timeA < timeB) return -1; //-1 berarti a harus ditempatkan sebelum b dalam urutan
        if (timeA > timeB) return 1; //1 berarti a harus ditempatkan setelah b dalam uruttan
        return 0;
      })
    );
  };

  // Fungsi untuk mengedit item pada indeks tertentu dalam array items
  const editItem = (index, updatedItem) => {
    const updatedItems = [...items];
    // Memeriksa apakah ada item lain dengan waktu yang sama seperti updatedItem
    const editedTimeExists = items.some(
      (item, i) =>
        i !== index && // Tidak memeriksa item yang sedang diedit
        item.time === updatedItem.time
    );
    // Jika ada item lain dengan waktu yang sama, munculkan peringatan dan hentikan fungsi
    if (editedTimeExists) {
      // alert("Waktu sudah ada ritualnya sob. Coba cari waktu lainnya!");
      Swal.fire({
        icon: "error",
        title: "Opps...",
        text: "Waktu sudah ada ritualnya sob. Coba cari waktu lainnya!",
      });
      return;
    }
    // Memperbarui item pada indeks yang diberikan dengan nilai updatedItem
    updatedItems[index] = updatedItem;
    // Memperbarui state items dengan nilai yang sudah diperbarui
    setItems(updatedItems);
  };

  const removeItem = (index) => {
    Swal.fire({
      title: "Yakin bro?",
      text: "Apakah benar kamu mau menghapus ritual ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setItems(items.filter((item, i) => i !== index));
        Swal.fire("Yeay!", "Ritual berhasil dihapus", "success");
      }
    });
  };

  const removeAllItems = () => {
    if (items.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Upps...",
        text: "Tidak ada yang dihapus karena tidak ada ritual yang tersedia.",
      });
    } else {
      Swal.fire({
        title: "Yakin sob?",
        text: "Apakah benar kamu mau menghapus semua ritual?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete all!",
      }).then((result) => {
        if (result.isConfirmed) {
          setItems([]);
          Swal.fire("Yeay!", "Semua ritual berhasil dihapus", "success");
        }
      });
    }
  };

  const removeCompletedItems = () => {
    const isAnyComplete = items.some((item) => item.completed);
    if (!isAnyComplete) {
      Swal.fire({
        icon: "warning",
        title: "Upps...",
        text: "Tidak ada yang dihapus karena tidak ada ritual yang done (selesai).",
      });
    } else {
      Swal.fire({
        title: "Yakin sob?",
        text: "Apakah benar kamu mau menghapus semua ritual yang done (selesai)?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setItems(items.filter((item) => !item.completed));
          Swal.fire(
            "Yeay!",
            "Semua  ritual yang done (selesai) berhasil dihapus",
            "success"
          );
        }
      });
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedItems = [...items];
    updatedItems[index].completed = !updatedItems[index].completed;
    setItems(updatedItems);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Jumlah item dalam list (all)
  const jumlahItem = items.length;

  // Jumlah todo yang sudah selesai (done)
  const jumlahTodoDone = items.filter((item) => item.completed).length;

  // Jumlah todo yang belum selesai (todo)
  const jumlahTodoBelumDone = items.filter((item) => !item.completed).length;

  return (
    <div className="h-full min-h-[100vh] gap-4 bg-image py-10 px-12">
      <h1 className="text-white font-bold text-5xl text-center ">
        Ritual Ramadhan List
      </h1>
      <h1 className="text-white font-bold text-4xl text-center pt-4">
        <i className="fa-regular fa-clock"></i>{" "}
        {currentWaktu.toLocaleTimeString()}
      </h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 justify-center pt-10">
        <div className="w-full md:w-auto bg-white shadow-md rounded-lg overflow-hidden mx-4">
          <div className="px-4 py-2">
            <h1 className="text-3xl font-bold mb-4"> Tambahkan Ritual</h1>
            <div className="">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const newItemName = e.target.itemName.value;
                  const newItemTime = e.target.itemTime.value; // Mendapatkan nilai waktu dari input

                  addItem({
                    id: Date.now(),
                    name: newItemName,
                    time: newItemTime, // Menambahkan waktu ke item
                  });
                  e.target.reset();
                }}
              >
                <label htmlFor="itemTime" className="mb-1 font-bold text-lg">
                  Waktu
                </label>
                <input
                  type="time" // Menambah input waktu
                  name="itemTime"
                  placeholder="Masukkan Waktu"
                  className="mr-2 border rounded-md px-2 py-1 flex-grow md:flex-grow-0 w-full md:w-full mb-2"
                />
                <label htmlFor="itemName" className="mb-1 font-bold text-lg">
                  Nama
                </label>
                <input
                  type="text"
                  name="itemName"
                  placeholder="Masukkan Ritual Ramadhanmu"
                  className="mr-2 border rounded-md px-2 py-1 flex-grow md:flex-grow-0 w-full md:w-full"
                />
                <button
                  className="mt-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-1 md:mx-0"
                  type="submit"
                >
                  Tambah <i className="fa-solid fa-square-plus"> </i>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="w-full h-auto md:w-auto bg-white shadow-md rounded-lg overflow-hidden mx-4">
          <div className="px-4 py-2 ">
            <h2 className="text-3xl font-bold mb-2"> Ritual Hari Ini </h2>
            <input
              type="text"
              placeholder="Cari Nama Ritualmu Disini..."
              className="mr-2 border rounded-md px-2 py-1 flex-grow md:flex-grow-0 w-full md:w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="flex justify-start gap-3">
              <button
                className="bg-sky-500 hover:bg-sky-600 rounded-md w-[10%] py-2 mt-3"
                onClick={() => handleFilterChange("All")}
              >
                <span className="text-white font-semibold text-l">
                  All({jumlahItem})
                </span>
              </button>
              <button
                className="bg-sky-500 hover:bg-sky-600 rounded-md w-[15%] py-2 mt-3"
                onClick={() => handleFilterChange("Todo")}
              >
                <span className="text-white font-semibold">
                  Todo({jumlahTodoBelumDone})
                </span>
              </button>
              <button
                className="bg-sky-500 hover:bg-sky-600 rounded-md w-[15%] py-2 mt-3"
                onClick={() => handleFilterChange("Done")}
              >
                <span className="text-white font-semibold">
                  Done({jumlahTodoDone})
                </span>
              </button>
              <button
                className="bg-red-800 hover:bg-red-900 rounded-md w-[10%] py-3 mt-3"
                onClick={removeAllItems}
              >
                <span className="text-white font-semibold">
                  <i className="fa-regular fa-trash-can"></i> All
                </span>
              </button>
              <button
                className="bg-red-800 hover:bg-red-900 rounded-md  w-[15%] py-2 mt-3"
                onClick={removeCompletedItems}
              >
                <span className="text-white font-semibold">
                  <i className="fa-solid fa-trash-can"></i> Done
                </span>
              </button>
            </div>
            
            <table className="border-collapse border border-gray-200 w-full mt-3">
              <thead className="bg-yellow-200">
                <tr>
                  <th className="border border-gray-200 px-2 py-2">
                    Nama Ritual
                  </th>
                  <th className="border border-gray-200 px-2 py-2"> Waktu </th>
                  <th className="border border-gray-200 px-2 py-2"> Aksi </th>
                </tr>
              </thead>
              <tbody>
                {items
                  .filter(
                    (item) =>
                      item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .filter((item) => {
                    if (filter === "All") return true;
                    if (filter === "Done") return item.completed;
                    if (filter === "Todo") return !item.completed;
                    return true;
                  })
                  .map((item, index) => (
                    <tr key={item.id} className="bg-white">
                      <td className="border border-gray-200 px-1 py-1">
                        {editIndex === index ? (
                          <input
                            type="text"
                            value={editedName === "" ? item.name : editedName} //jika editan itu kosong maka dilainya dikembalikan semula
                            onChange={(e) => setEditedName(e.target.value)}
                            className="p-3 rounded-lg shadow-sm focus:outline-none"
                          />
                        ) : (
                          <>
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={() => handleCheckboxChange(index)}
                              className="mr-2 h-5 w-5"
                            />
                            <span
                              className={`py-2 px-4 ${
                                item.completed
                                  ? "line-through text-red-500"
                                  : "text-black"
                              }`}
                            >
                              {item.name}
                            </span>
                          </>
                        )}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {editIndex === index ? (
                          <input
                            type="time"
                            value={editedTime === "" ? item.time : editedTime}
                            onChange={(e) => setEditedTime(e.target.value)}
                            className="mr-2 border rounded-md px-2 py-1 flex-grow md:flex-grow-0 w-full md:w-full"
                          />
                        ) : (
                          <span className="py-2 px-4 text-gray-500">
                            {item.time}
                          </span>
                        )}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {editIndex === index ? (
                          <>
                            <button
                              className="bg-green-500 hover:bg-green-600 p-2 rounded-lg text-white mr-2"
                              onClick={() => {
                                if (
                                  editedName.trim() === "" ||
                                  editedTime.trim() === ""
                                ) {
                                  alert("Nama atau waktu tidak boleh kosong!");
                                  return;
                                }
                                editItem(index, {
                                  ...item,
                                  name: editedName,
                                  time: editedTime,
                                });
                                setEditIndex(null);
                                setEditedName("");
                                setEditedTime("");
                              }}
                            >
                              Simpan
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 p-2 rounded-lg text-white"
                              onClick={() => {
                                setEditIndex(null);
                                setEditedName("");
                                setEditedTime("");
                              }}
                            >
                              Batal{" "}
                            </button>{" "}
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEditedName(item.name);
                                setEditedTime(item.time);
                                setEditIndex(index);
                              }}
                              className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg text-white mr-2"
                              disabled={item.completed}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 p-2 rounded-lg text-white"
                              onClick={() => removeItem(index)}
                            >
                              Hapus
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RamadhanListApp;
