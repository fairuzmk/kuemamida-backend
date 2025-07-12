import OptionModel from '../models/optionModel.js';

// Simpan opsi baru
export const saveOptions = async (req, res) => {
  try {
    const options = JSON.parse(req.body.options);
    const newOptions = new OptionModel({ options });
    await newOptions.save();
    res.status(201).json({ success: true, data: newOptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Ambil semua opsi
export const getAllOptions = async (req, res) => {
  try {
    const options = await OptionModel.find();
    res.status(200).json({ success: true, data: options });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update opsi berdasarkan ID
export const updateOptions = async (req, res) => {
  try {
    const { id } = req.params;
    const options = JSON.parse(req.body.options);
    const updated = await OptionModel.findByIdAndUpdate(id, { options }, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller untuk menghapus dokumen option berdasarkan ID
export const deleteOption = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await OptionModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Option tidak ditemukan" });
    }

    res.json({ success: true, message: "Option berhasil dihapus" });
  } catch (error) {
    console.error("DELETE OPTION ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOptionByType = async (req, res) => {
  try {
    const { name } = req.params; // contoh: Diameter, Bentuk

    const result = await OptionModel.findOne({
      [`options.${name}`]: { $exists: true }
    });

    console.log("DEBUG result:", result);

    if (!result || !result.options || !result.options.get(name)) {
      return res.status(404).json({ success: false, message: `Opsi "${name}" tidak ditemukan` });
    }

    const data = result.options.get(name); // Akses via Map

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};