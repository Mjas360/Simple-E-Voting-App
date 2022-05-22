import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData, addDoc, doc, collection, deleteDoc, updateDoc} from '@angular/fire/firestore';
//import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';

export interface Note{
  id?: string;
  title: string;
  text: string;
}

export interface Topic{
  id?: string;
  title: string;
  text: string;
}

export interface Question{
  id?: string;
  title: string;
  text: string;
}
export interface Profile {
  id?: string;
  email: string;
  Fname: string;
  Lname: string;
  Department: string;
  MatricNo: string;
}
export interface Poll{
  id?: string;
  topic: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  option5: string;
  email: string;
}
export interface ProfilePix {
  id?: string;
  PixPath: string;
}

export interface Response {
  id?: string;
  option: string;
  pollID: string;
  email:  string;
}

export interface Admin {
  id?: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }
  getNotes(): Observable<Note[]>{
    const noteRef = collection(this.firestore, 'notes');
    return collectionData(noteRef, {idField: 'id'}) as Observable<Note[]>;
  }
////////////add poll
getPoll(): Observable<Poll[]>{
  const noteRef = collection(this.firestore, 'poll');
  return collectionData(noteRef, {idField: 'id'}) as Observable<Poll[]>;
}
addPoll(note: Poll){
  const noteRef = collection(this.firestore, 'poll');
  return addDoc(noteRef, note);
}
getPollById(id): Observable<Poll> {
  const noteDocRef = doc(this.firestore, `poll/${id}`);
  return docData(noteDocRef, {idField: 'id'}) as Observable<Poll>;
}
deletePoll(note: Poll){
  const noteDocRef = doc(this.firestore, `poll/${note.id}`);
  return deleteDoc(noteDocRef);
}
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//add profile
addProfile(note:Profile){
  const noteRef = collection(this.firestore, 'profiles');
  return addDoc(noteRef, note);
}
getProfile(): Observable<Profile[]>{
  const noteRef = collection(this.firestore, 'profiles');
  return collectionData(noteRef, {idField: 'id'}) as Observable<Profile[]>;
}
//////////////////////////////////////////////////////////////////

addProfilePix(note: ProfilePix){
  const noteRef = collection(this.firestore, 'ProfilePix');
  return addDoc(noteRef, note);
}
UpdateProfilePix(note: ProfilePix){
  const noteDocRef = doc(this.firestore, `ProfilePix/${note.id}`);
  return updateDoc(noteDocRef, {PixPath: note.PixPath});
}
getProfilePix(): Observable<ProfilePix[]>{
  const noteRef = collection(this.firestore, 'ProfilePix');
  return collectionData(noteRef, {idField: 'id'}) as Observable<ProfilePix[]>;
}
deleteProfilePix(note: ProfilePix){
  const noteDocRef = doc(this.firestore, `ProfilePix/${note.id}`);
  return deleteDoc(noteDocRef);
}
getProfilePixById(id): Observable<ProfilePix> {
  const noteDocRef = doc(this.firestore, `ProfilePix/${id}`);
  return docData(noteDocRef, {idField: 'id'}) as Observable<ProfilePix>;
}
///////////////
addAdmin(note: Admin){
  const noteRef = collection(this.firestore, 'Admins');
  return addDoc(noteRef, note);
}
getAdmin(): Observable<Admin[]>{
  const noteRef = collection(this.firestore, 'Admins');
  return collectionData(noteRef, {idField: 'id'}) as Observable<Admin[]>;
}
//////////////////////////////////////////
getResponse(): Observable<Response[]>{
  const noteRef = collection(this.firestore, 'responses');
  return collectionData(noteRef, {idField: 'id'}) as Observable<Response[]>;
}
addResponses(note: Response){
  const noteRef = collection(this.firestore, 'responses');
  return addDoc(noteRef, note);
}
getResponseById(id): Observable<Response> {
  const noteDocRef = doc(this.firestore, `responses/${id}`);
  return docData(noteDocRef, {idField: 'id'}) as Observable<Response>;
}
//////////////////////////////////////
  //add note function
  addNote(note: Note){
    const noteRef = collection(this.firestore, 'notes');
    return addDoc(noteRef, note);
  }

  addTopic(note: Topic){
    const noteRef = collection(this.firestore, 'topics');
    return addDoc(noteRef, note);
  }
  addQuestion(note: Question){
    const noteRef = collection(this.firestore, 'questions');
    return addDoc(noteRef, note);
  }
///delete functions

  deleteNote(note: Note){
    const noteDocRef = doc(this.firestore, 'note/${note.id}');
    return deleteDoc(noteDocRef);
  }

  deleteTopic(note: Note){
    const noteDocRef = doc(this.firestore, 'topic/${note.id}');
    return deleteDoc(noteDocRef);
  }

  deleteQuestion(note: Note){
    const noteDocRef = doc(this.firestore, 'question/${note.id}');
    return deleteDoc(noteDocRef);
  }

  updateNote(note: Note){
    const noteDocRef = doc(this.firestore, 'note/${note.id}');
    return updateDoc(noteDocRef, {title: note.title, text: note.text});
  }
}
